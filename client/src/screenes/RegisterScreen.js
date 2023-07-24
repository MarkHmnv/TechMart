import {useEffect, useState} from "react";
import FormContainer from "../components/FormContainer";
import {Button, Col, Form, Row} from "react-bootstrap";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setAccessToken, useRegisterMutation} from "../redux/slices/authApiSlice";
import Loader from "../components/Loader";
import {showToastError} from "../util/toastUtils";
import {toast} from "react-toastify";

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [register, {isLoading}] = useRegisterMutation();
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
        if(password !== confirmPassword){
            toast.error("Password do not match");
            return;
        }
        try {
            const res = await register({name, email, password}).unwrap();
            dispatch(setAccessToken(res));
            navigate(redirect);
        } catch (error) {
            showToastError(error);
        }
    };

    return (
        <FormContainer>
            <h1>Registration</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="my-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>
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
                <Form.Group controlId="confirmPassword" className="my-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
                    Register
                </Button>
                {isLoading && <Loader />}
            </Form>
            <Row className="py-3">
                <Col>
                    Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Log in</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default RegisterScreen;
