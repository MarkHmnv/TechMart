import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument} from "../model/document/user.model";
import {Model} from "mongoose";
import {UserNotFoundException} from "../exception/user-not-found.exception";
import {UserProfile} from "../model/response/user-profile.dto";
import {UserReq} from "../model/interface/UserReq";
import {UserUpdate} from "../model/request/user-update.dto";
import {UserExistsException} from "../exception/user-exists.exception";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getUserProfile(req: UserReq) : Promise<UserProfile> {
        const user = await this.getUserById(req.user.sub);
        return new UserProfile(user.name, user.email);
    }

    async updateUserProfile(req: UserReq, userUpdate: UserUpdate): Promise<UserProfile> {
        let user = await this.getUserById(req.user.sub);
        if(user.email !== userUpdate.email){
            const isExists = await this.isUserExistsByEmail(userUpdate.email)
            if(isExists)
                throw new UserExistsException();
        }

        const updatedUser = await this.userModel.findByIdAndUpdate(
            req.user.sub,
            { $set: userUpdate },
            { new: true }
        ).exec();

        return new UserProfile(updatedUser.name, updatedUser.email);
    }

    async getUserById(id: string): Promise<UserDocument> {
        return await this.userModel.findById(id).exec()
            ?? (() => {throw new UserNotFoundException()})();
    }

    async getUserByEmail(email: string): Promise<UserDocument> {
        return await this.userModel.findOne({ email }).exec()
            ?? (() => {throw new UserNotFoundException(`User with email ${email} was not found`)})();
    }

    async isUserExistsByEmail(email: string): Promise<boolean> {
        const count = await this.userModel.countDocuments({ email }).exec();
        return count > 0;
    }
}