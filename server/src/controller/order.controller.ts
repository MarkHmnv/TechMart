import {OrderService} from "../service/order.service";
import {Body, Controller, Get, HttpCode, HttpStatus, Param, Patch, Post, Req, UseGuards} from "@nestjs/common";
import {AuthGuard} from "../guard/auth.guard";
import {HasAnyRole} from "../decorator/has-any-role.decorator";
import {Role} from "../model/enum/role.enum";
import {OrderDto} from "../model/request/order.dto";
import {UserReq} from "../model/interface/UserReq";
import {Order} from "../model/document/order.model";
import {PaymentResultDto} from "../model/request/payment-result.dto";

@Controller("api/v1/orders")
@UseGuards(AuthGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get()
    @HasAnyRole(Role.ADMIN)
    async getAllOrders() {
        return this.orderService.getAllOrders();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async addOrder(@Req() req: UserReq, @Body() orderDto: OrderDto): Promise<Order> {
        return this.orderService.addOrder(req, orderDto);
    }

    @Get("/:id")
    async getOrderById(@Param("id") id: string): Promise<Order> {
        return this.orderService.getOrder(id);
    }

    @Get("/my")
    async getMyOrders(@Req() req: UserReq): Promise<Order[]> {
        return this.orderService.getMyOrders(req);
    }

    @Patch("/:id/pay")
    async updateOrderToPaid(@Body() paymentResultDto: PaymentResultDto, @Param("id") id: string) {
        return this.orderService.updateOrderToPaid(paymentResultDto, id);
    }

    @Patch("/:id/deliver")
    async updateOrderToDelivered(@Param("id") id: string) {
        return this.orderService.updateOrderToDelivered(id);
    }
}