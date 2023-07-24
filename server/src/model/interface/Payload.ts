import {Role} from "../enum/role.enum";

export interface Payload {
    sub: string,
    name: string,
    role: Role
}