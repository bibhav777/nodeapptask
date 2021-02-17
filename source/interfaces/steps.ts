import { Document } from 'mongoose';

export default interface Steps extends Document {
    userId: string;
    steps: Number;
}
