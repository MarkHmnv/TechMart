import {Injectable} from "@nestjs/common";

@Injectable()
export class ConfigService {

    getPayPalClientId() {
        return {clientId: process.env.PAYPAL_CLIENT_ID};
    }
}