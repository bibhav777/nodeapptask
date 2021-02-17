import { NextFunction, Request, Response } from 'express';
import Steps from '../models/Steps';
import mongoose from 'mongoose';
import moment from 'moment';

const Step = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, steps } = req.body;
        const step = new Steps({
            userId: userId,
            steps: steps
        });
        const saveStep = await step.save();
        return res.status(200).json({ status: true, data: saveStep, msg: 'Step posted Sucessfully !' });
    } catch (error) {
        console.log(error);
    }
};

const totalStep = async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.body;
    console.log(userId);
    try {
        const totalStep = await Steps.aggregate([
            {
                $match: {
                    userId: mongoose.Types.ObjectId(userId)
                }
            },
            {
                $group: {
                    _id: null,
                    user_totalsteps: { $sum: '$steps' }
                }
            }
        ]);
        res.status(200).json({
            status: true,
            data: totalStep
        });
    } catch (error) {
        console.log(error);
    }
};

const filterSteps = async (req: Request, res: Response, next: NextFunction) => {
    //on progress
    const userid = req.body.id;
    let { startDate, endDate } = req.query;
    if (startDate === '' || endDate === '') {
        return res.status(400).json({
            status: 'faliure',
            message: 'Please ensure you pick two dates'
        });
    }

    const totalStep = await Steps.aggregate([
        {
            $match: {
                userId: mongoose.Types.ObjectId(userid)
            }
        },
        {
            $group: {
                _id: null,
                user_totalsteps: { $sum: '$steps' }
            }
        }
    ]);
};

export default { Step, totalStep, filterSteps };
