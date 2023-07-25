import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {Button, Col, Form, Row} from "react-bootstrap";
import Title from "../components/Title";
import {useGetProfileQuery, useUpdateProfileMutation} from "../redux/slices/usersApiSlice";
import Loader from "../components/Loader";
import {showToastError} from "../util/toastUtils";
import {updateName} from "../redux/slices/authApiSlice";
import {toast} from "react-toastify";

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {data: profile, isLoading} = useGetProfileQuery();
    const [updateProfile, {isLoading: loadingUpdateProfile}] = useUpdateProfileMutation();

    useEffect(() => {
        if (profile) {
            setName(profile.name);
            setEmail(profile.email);
        }
    }, [profile, isLoading]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword) {
            toast.error("Password do not match");
            return;
        }
        try {
            const pass = password === "" ? null : password;
            const res = await updateProfile({name, email, pass}).unwrap();
            dispatch(updateName(res.name));
            toast.success("Profile updated successfully")
        } catch (error) {
            showToastError(error);
        }
    }

    return (
        <>
            <Title title={"User Profile"} />
            <Row>
                <Col md={3}>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name" className="my-2">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="name"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="email" className="my-2">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="my-2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword" className="my-2">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="my-2">
                            Update
                        </Button>
                        {loadingUpdateProfile && <Loader/>}
                    </Form>
                </Col>
                <Col md={9}>

                </Col>
            </Row>
        </>
    );
};

export default ProfileScreen;
