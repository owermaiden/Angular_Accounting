import { Company } from "./company";
import { Role } from "./role";

export interface User {
    id: number;
    username: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
    role: Role;
    company: Company;

}
