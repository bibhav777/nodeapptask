import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import Steps from '../interfaces/steps';

const StepsSchema: Schema = new Schema(
    {
        userId: {
            ref: 'User',
            type: mongoose.Schema.Types.ObjectId
        },
        steps: { type: Number, required: true }
    },
    { timestamps: true }
);

StepsSchema.post<Steps>('save', function () {
    logging.info('Mongo', 'Checkout the steps we just saved: ', this);
});

export default mongoose.model<Steps>('Step', StepsSchema);
