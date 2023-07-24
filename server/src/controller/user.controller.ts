import {Body, Controller, Get, Patch, Req, UseGuards} from "@nestjs/common";
import {UserService} from "../service/user.service";
import {AuthGuard} from "../guard/auth.guard";
import {UserProfile} from "../model/response/user-profile.dto";
import {UserReq} from "../model/interface/UserReq";
import {UserUpdate} from "../model/request/user-update.dto";

@Controller("api/v1/users")
@UseGuards(AuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get("/profile")
    async getUserProfile(@Req() req: UserReq): Promise<UserProfile> {
        return this.userService.getUserProfile(req);
    }

    @Patch("/profile")
    async updateUserProfile(@Req() req: UserReq, @Body() userUpdate: UserUpdate): Promise<UserProfile> {
        return this.userService.updateUserProfile(req, userUpdate);
    }
}