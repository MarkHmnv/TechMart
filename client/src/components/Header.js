import {Navbar, Nav, Container, Badge, NavDropdown} from "react-bootstrap";
import {FaShoppingCart, FaUser} from "react-icons/fa";
import { LinkContainer } from 'react-router-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {removeAccessToken} from "../redux/slices/authApiSlice";

const Header = () => {
    const {totalCartItemQuantity} = useSelector((state) => state.cart);
    const {name} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = () => {
        dispatch(removeAccessToken());
        navigate("/");
    }

    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand>TechMart</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <LinkContainer to="/cart">
                                <Nav.Link><FaShoppingCart /> Cart
                                    {totalCartItemQuantity > 0 && (
                                        <Badge pill bg="success" className="cart-badge">
                                            {totalCartItemQuantity}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>

                            {name ? (
                                <NavDropdown title={name} id="name">
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link><FaUser /> Login</Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;