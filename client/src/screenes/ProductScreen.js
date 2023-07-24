import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Form, Image, ListGroup, Row} from "react-bootstrap";
import Rating from "../components/Rating";
import {useGetProductByIdQuery} from "../redux/slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {useState} from "react";
import {addToCart} from "../redux/slices/cartSlice";
import {useDispatch} from "react-redux";

const ProductScreen = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const {data: product, error, isLoading} = useGetProductByIdQuery(id);

    const addToCartHandler = () => {
        dispatch(addToCart({...product, quantity}));
        navigate("/cart");
    }

    return (
        <>
        {isLoading ? (
            <Loader />
        ) : error ? (
            <Message variant="danger">
                {error?.data?.message || error.error}
            </Message>
        ) : (<>
            <Link to="/" className="btn btn-outline-dark my-3">
                Go Back
            </Link>
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating}
                                    text={`${product.numReviews} reviews`}
                            />
                        </ListGroup.Item>
                        <ListGroup.Item className="product-price">
                            <h5>${product.price}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col><strong>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</strong></Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Quantity:</Col>
                                        <Col>
                                            <Form.Control
                                            as="select"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Number(e.target.value))}>
                                                {[...Array(product.countInStock).keys()].map((i) => (
                                                    <option key={i+1} value={i+1}>
                                                        {i+1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button
                                    className="btn-block"
                                    type="button"
                                    disabled={product.countInStock === 0}
                                    onClick={addToCartHandler}
                                >
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>)}
        </>
    );
};

export default ProductScreen;