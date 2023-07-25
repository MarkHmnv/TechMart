import {Controller, Get, UseGuards} from "@nestjs/common";
import {ConfigService} from "../service/config.service";
import {AuthGuard} from "../guard/auth.guard";

@Controller("api/v1/config")
@UseGuards(AuthGuard)
export class ConfigController {
    constructor(private readonly configService: ConfigService ) {}

    @Get("/paypal")
    getPayPalClientId() {
        return this.configService.getPayPalClientId();
    }
}