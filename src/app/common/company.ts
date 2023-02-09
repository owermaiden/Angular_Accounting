import { Address } from "./address";

export interface Company {
    id: number;
    title: string;
    phone: string;
    website: string;
    companyStatus: string;
    adress: Address;
}
