import { MyCharity } from './myCharity';
export class User {
    user_id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    totalDonated: number;
    myCharities: Array<MyCharity> = [];
}