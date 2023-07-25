import {Container, Button, ProgressBar, Nav, NavLink} from 'react-bootstrap';
import {LinkContainer} from "react-router-bootstrap";

const CheckoutSteeper = ({currentStep, totalSteps}) => {
    let percentage = (currentStep / totalSteps) * 100;

    return (
        <Container className="mb-3">
            <Nav className="justify-content-center mb-2">
                <Nav.Item>
                    {currentStep >= 1 ? (
                        <LinkContainer to="/shipping">
                            <NavLink>Shipping</NavLink>
                        </LinkContainer>
                    ) : (
                        <NavLink disabled>Shipping</NavLink>
                    )}
                </Nav.Item>
                <Nav.Item>
                    {currentStep >= 2 ? (
                        <LinkContainer to="/payment">
                            <NavLink>Payment</NavLink>
                        </LinkContainer>
                    ) : (
                        <NavLink disabled>Payment</NavLink>
                    )}
                </Nav.Item>
                <Nav.Item>
                    {currentStep >= 3 ? (
                        <LinkContainer to="/placeorder">
                            <NavLink>Place Order</NavLink>
                        </LinkContainer>
                    ) : (
                        <NavLink disabled>Place Order</NavLink>
                    )}
                </Nav.Item>
            </Nav>
            <ProgressBar now={percentage} />
        </Container>
    );
}

export default CheckoutSteeper;