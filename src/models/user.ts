import { MyCharity } from './myCharity';
export class User {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    totalDonated: number;
    myCharities: Array<MyCharity> = [];
}