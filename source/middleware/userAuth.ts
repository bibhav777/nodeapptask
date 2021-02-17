import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) res.status(401).json({ status: false, error: 'Access-denied' });
        const decode = jwt.verify(token, 'jwtocode');
        req.user = decode;
        next();
    } catch (error) {}
};

export default { auth };
