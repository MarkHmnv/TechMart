import {BadRequestException} from "@nestjs/common";

export class IllegalCreatingException extends BadRequestException {
    constructor() {
        super("Cannot create item: Invalid data");
    }
}