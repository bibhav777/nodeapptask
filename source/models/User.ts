import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import User from '../interfaces/user';

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        password: { type: String, required: true },
        multi_factor_enabled: { type: Boolean, default: false },
        multi_factor_code: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

UserSchema.post<User>('save', function () {
    logging.info('Mongo', 'Checkout the User we just saved: ', this);
});

export default mongoose.model<User>('User', UserSchema);
