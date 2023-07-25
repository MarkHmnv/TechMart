import {Link, useParams} from "react-router-dom";
import {useGetOrderByIdQuery, useGetPayPalClientIdQuery, usePayOrderMutation} from "../redux/slices/ordersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Title from "../components/Title";
import {Col, ListGroup, Row, Image, Card, Button} from "react-bootstrap";
import {PayPalButtons, usePayPalScriptReducer} from "@paypal/react-paypal-js";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {showToastError} from "../util/toastUtils";

const OrderScreen = () => {
    const {id} = useParams();
    const {data: order, refetch, isLoading, error: errorGetOrder} = useGetOrderByIdQuery(id);
    const [payOrder, {isLoading: isLoadingPay}] = usePayOrderMutation();
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer();
    const {data: paypal, isLoading: isLoadingPaypal, error: errorPaypal} = useGetPayPalClientIdQuery();

    useEffect(() => {
        if(!errorPaypal && !isLoadingPaypal && paypal) {
            const loadPaypalScript = async () => {
                paypalDispatch({
                    type: "resetOptions",
                    payPalOptions: {
                        "client-id": paypal.clientId,
                        currency: "USD"
                    }
                });

                paypalDispatch({type: "setLoadingStatus", value: "pending"});
            }
            if(order && !order.isPaid && !window.paypal) {
                loadPaypalScript();
            }
        }
    }, [order, paypal, paypalDispatch, isLoadingPaypal, errorPaypal]);

    const onApproveTest = async () => {
        await payOrder({id, details : {payer: {}}});
        refetch();
        toast.success("Payment successful");
    }

    const onApprove = async (data, actions) => {
        return actions.order.capture().then(async details => {
            try {
                await payOrder({id, details});
                refetch();
                toast.success("Payment successful");
            } catch (error){
                showToastError(error);
            }
        });
    }

    const onError = (err) => {
        showToastError(err);
    }

    const createOrder = async (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice
                    }
                }
            ]
        }).then((orderId) => orderId);
    }

    return isLoading ? <Loader /> : errorGetOrder ? <Message variant="danger">{errorGetOrder}</Message>
    : (
        <>
            <Title title={`Order ${order._id}`}/>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong> {order.user.email}
                            </p>
                            <p>
                                <strong>Address: </strong>
                                {order.shippingAddress.address}, {order.shippingAddress.city},
                                {" "} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            <div>
                                {order.isDelivered ? (
                                    <Message variant="success">
                                        Delivered on {order.deliveredAt}
                                    </Message>
                                ) : (
                                    <Message variant="danger">
                                        Not delivered
                                    </Message>
                                )}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant="success">
                                    Paid on {order.paidAt}
                                </Message>
                            ) : (
                                <Message variant="danger">Not paid</Message>
                            )}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col>
                                            <Link to={`/products/${item._id}`}>
                                                {item.name}
                                            </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items price:</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping price:</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax price:</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row className="fw-bold">
                                    <Col>Total price:</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {isPending || isLoadingPay ? <Loader /> : (
                                        <>
                                            {/*<Button onClick={onApproveTest}>*/}
                                            {/*    Test Pay Order*/}
                                            {/*</Button>*/}
                                            <PayPalButtons
                                                createOrder={createOrder}
                                                onApprove={onApprove}
                                                onError={onError}
                                            />
                                        </>
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default OrderScreen;
