import { Company } from "./company";
import { Role } from "./role";

export class User {
    constructor(public id?: number,
                public username?: string,
                public password?: string,
                public firstname?: string,
                public lastname?: string,
                public phone?: string,
                public role?: Role,
                public company?: Company,
                public isOnlyAdmin?: boolean ){}
}
