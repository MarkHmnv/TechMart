import {useEffect, useState} from "react";
import {DEFAULT_PAYMENT_METHOD, TOTAL_CHECKOUT_STEPS} from "../util/constants";
import FormContainer from "../components/FormContainer";
import CheckoutSteeper from "../components/CheckoutSteeper";
import {Button, Col, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {savePaymentMethod} from "../redux/slices/cartSlice";

const PaymentScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {shippingAddress} = useSelector(state => state.cart);
    const [paymentMethod, setPaymentMethod] = useState(DEFAULT_PAYMENT_METHOD);

    useEffect(() => {
        if(!shippingAddress){
            navigate("/shipping");
        }
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    }

    return (
        <FormContainer>
            <CheckoutSteeper currentStep={2} totalSteps={TOTAL_CHECKOUT_STEPS} />
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type="radio"
                            className="my-2"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={e => setPaymentMethod(e.target.value)}
                        />
                        <Button type="submit" variant="primary" className="my-2">
                            Continue
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </FormContainer>
    );
};

export default PaymentScreen;
