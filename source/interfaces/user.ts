import { Document } from 'mongoose';

export default interface User extends Document {
    username: string;
    first_name: string;
    last_name: string;
    password: string;
    multifactor_enabled: boolean;
    multifactor_code: String;
}
