import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import CheckoutSteeper from "../components/CheckoutSteeper";
import {TOTAL_CHECKOUT_STEPS} from "../util/constants";
import {Button, Card, Col, Image, ListGroup, Row} from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import {useCreateOrderMutation} from "../redux/slices/ordersApiSlice";
import Loader from "../components/Loader";
import {clearCartItems} from "../redux/slices/cartSlice";
import {showToastError} from "../util/toastUtils";

const PlaceOrderScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const [createOrder, {isLoading}] = useCreateOrderMutation();

    useEffect(() => {
        if(!cart.shippingAddress.address) {
            navigate("shipping");
        } else if(!cart.paymentMethod) {
            navigate("payment");
        }
    }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

    const placeOrderHandler = async () => {
        try{
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/orders/${res._id}`);
        } catch (error){
            showToastError(error);
        }
    }

    return (
        <>
            <FormContainer>
                <CheckoutSteeper currentStep={3} totalSteps={TOTAL_CHECKOUT_STEPS} />
            </FormContainer>
            <Row>
                <Col md={8}>
                   <ListGroup variant="flush">
                       <ListGroup.Item>
                           <h2>Shipping</h2>
                           <p>
                               <strong>Address: </strong>
                               {cart.shippingAddress.address}, {cart.shippingAddress.city},
                               {" "} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                           </p>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <h2>Payment Method</h2>
                           <p>
                               <strong>Method: </strong>
                               {cart.paymentMethod}
                           </p>
                       </ListGroup.Item>
                       <ListGroup.Item>
                           <h2>Order items</h2>
                           {cart.cartItems.length === 0 ? (
                               <Message>Your cart is empty</Message>
                           ) : (
                               <ListGroup variant="flush">
                                   {cart.cartItems.map((item, index) => (
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
                               </ListGroup>
                           )}
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
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping price:</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax price:</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row className="fw-bold">
                                    <Col>Total price:</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button
                                    type="button"
                                    className="btn-block"
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                                {isLoading && <Loader />}
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;
