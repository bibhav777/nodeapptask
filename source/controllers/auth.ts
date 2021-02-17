import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import speakeasy from 'speakeasy';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (username === '' || password === '') {
        return res.status(400).json({ status: false, message: 'Please enter username and password' });
    }
    try {
        const user = await User.findOne({ username: username });
        if (!user) return res.status(400).json({ status: false, msg: 'Username doesnt exists' });
        if (user.multi_factor_enabled != true) return res.status(400).json({ status: false, msg: 'Multifactor authentication is not enabled' });
        if (user) {
            const hashPassword = user.password;
            if (bcrypt.compareSync(password, hashPassword)) {
                const token = jwt.sign({ _id: user._id, username: user.username }, 'jwtcode');
                return res.status(200).json({
                    status: true,
                    Message: 'Login Success',
                    username: user.username,
                    token: token
                });
            }
        }
        return res.status(401).json({ status: false, message: "Password didn't match !" });
    } catch (error) {}
};

const verifyMultifactorAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { token, userId } = req.body;
    try {
        const user = await User.findOne({ _id: userId });
        const secret = user.multi_factor_code;
        const verified = await speakeasy.totp.verify({ secret, encoding: 'base32', token });
        if (verified) {
            const multi_factor_secret = await User.updateOne({ _id: userId }, { $set: { secret: user.multi_factor_code, multi_factor_enabled: true } });
            res.json({ verified: true });
        } else {
            res.json({ verified: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error finding the user'
        });
    }
};

const verifyTotpCode = async (req: Request, res: Response, next: NextFunction) => {
    const { token, userId } = req.body;
    try {
        const user = await User.findOne({ _id: userId });
        const secret = user.multi_factor_code;
        const tokenValidates = await speakeasy.totp.verify({ secret, encoding: 'base32', token, window: 1 });
        if (tokenValidates) {
            res.json({ validated: true });
        } else {
            res.json({ validated: false });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error finding the user'
        });
    }
};

export default { userLogin, verifyMultifactorAuth, verifyTotpCode };
