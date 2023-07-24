import {useEffect, useState} from "react";
import FormContainer from "../components/FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAccessToken, useLoginMutation} from "../redux/slices/authApiSlice";
import Loader from "../components/Loader";
import {showToastError} from "../util/toastUtils";

const LoginScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, {isLoading}] = useLoginMutation();
    const {accessToken} = useSelector(state => state.auth);
    const {search} = useLocation();
    const searchParams = new URLSearchParams(search);
    const redirect = searchParams.get("redirect") || "/";

    useEffect(() => {
        if(accessToken) {
            navigate(redirect);
        }
    }, [accessToken, redirect, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap();
            dispatch(setAccessToken(res));
            navigate(redirect);
        } catch (error) {
            showToastError(error);
        }
    };

    return (
        <FormContainer>
            <h1>Log in</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email" className="my-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="password" className="my-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
                    Log in
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className="py-3">
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen;
