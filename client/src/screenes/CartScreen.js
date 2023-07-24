import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Form, Image, ListGroup, Row} from "react-bootstrap";
import Title from "../components/Title";
import Message from "../components/Message";
import {FaTrashAlt} from "react-icons/fa";
import {addToCart, removeFromCart} from "../redux/slices/cartSlice";

const CartScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const {cartItems, totalCartItemQuantity} = cart;

    const addToCartHandler = async (item, quantity) => {
        dispatch(addToCart({...item, quantity}));
    };

    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/login?redirect=/shipping")
    }

    return (
        <>
            <Title title={"Shopping Cart"}/>
            {cartItems.length === 0
                ? (
                    <Message>
                        Your cart is empty <Link to="/">Go Back</Link>
                    </Message>
                )
                : (
                    <Row>
                    <Col md={8}>
                            <ListGroup variant="flush">
                                {cartItems.map(item => (
                                    <ListGroup.Item key={item._id}>
                                        <Row>
                                            <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col md={3}>
                                                <Link to={`/products/${item._id}`}>{item.name}</Link>
                                            </Col>
                                            <Col md={2} className="product-price">
                                                ${item.price}
                                            </Col>
                                            <Col md={2}>
                                                <Form.Control
                                                    as="select"
                                                    value={item.quantity}
                                                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}>
                                                    {[...Array(item.countInStock).keys()].map((i) => (
                                                        <option key={i+1} value={i+1}>
                                                            {i+1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                            <Col md={2}>
                                                <Button
                                                    type="button"
                                                    variant="danger"
                                                    onClick={() => removeFromCartHandler(item._id)}
                                                >
                                                    <FaTrashAlt />
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h5>
                                        Quantity: {totalCartItemQuantity} {totalCartItemQuantity > 1 ? "items" : "item"}
                                    </h5>
                                    <h5>Items price: ${cart.itemsPrice}</h5>
                                    {cart.shippingPrice > 0 && (
                                        <h5>Shipping price: ${cart.shippingPrice}</h5>
                                    )}
                                    <h5>Tax price: ${cart.taxPrice}</h5>
                                    <h4 className="fw-bold">Total price: ${cart.totalPrice}</h4>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-center">
                                    <Button
                                        type="button"
                                        className="btn-block"
                                        disabled={cartItems.length === 0}
                                        onClick={checkoutHandler}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </>

    );
};

export default CartScreen;
