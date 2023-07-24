import {ConflictException} from "@nestjs/common";

export class UserExistsException extends ConflictException {
    constructor() {
        super("User with this email is already exists");
    }
}