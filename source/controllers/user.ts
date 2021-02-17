import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import speakeasy from 'speakeasy';
import bcrypt from 'bcrypt';

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, first_name, last_name, password } = req.body;
        const saltround = 10;
        const hashPassword = bcrypt.hashSync(password, saltround);
        const multiCode = speakeasy.generateSecret();
        const user = new User({
            username,
            first_name,
            last_name,
            password: hashPassword,
            multi_factor_code: multiCode.base32
        });

        const saveUser = await user.save();
        return res.status(200).json({ status: true, data: saveUser, msg: 'User Created Sucessfully !' });
    } catch (error) {}
};

export default { createUser };
