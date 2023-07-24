import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, HydratedDocument} from "mongoose";
import {Role} from "../enum/role.enum";

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, default: Role.USER, enum: Role })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);