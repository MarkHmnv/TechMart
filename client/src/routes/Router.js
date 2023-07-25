import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeAccessToken } from "../redux/slices/authApiSlice";
import { isExpired } from "../util/jwtUtils";
import App from "../App";
import HomeScreen from "../screenes/HomeScreen";
import ProductScreen from "../screenes/ProductScreen";
import CartScreen from "../screenes/CartScreen";
import LoginScreen from "../screenes/LoginScreen";
import RegisterScreen from "../screenes/RegisterScreen";
import ShippingScreen from "../screenes/ShippingScreen";
import PrivateRoute from "../components/PrivateRoute";
import PaymentScreen from "../screenes/PaymentScreen";
import PlaceOrderScreen from "../screenes/PlaceOrderScreen";
import OrderScreen from "../screenes/OrderScreen";
import ProfileScreen from "../screenes/ProfileScreen";

const InnerRouter = () => {
    const dispatch = useDispatch();
    const { accessToken } = useSelector(state => state.auth);
    const location = useLocation();

    useEffect(() => {
        if (accessToken && isExpired(accessToken)) {
            dispatch(removeAccessToken());
        }
    }, [location, accessToken, dispatch]);

    return (
        <Routes>
            <Route path="/" element={<App/>}>
                <Route index element={<HomeScreen/>} />
                <Route path="products/:id" element={<ProductScreen/>} />
                <Route path="/cart" element={<CartScreen/>} />
                <Route path="/register" element={<RegisterScreen/>} />
                <Route path="/login" element={<LoginScreen/>} />

                <Route path="" element={<PrivateRoute />}>
                    <Route path="/shipping" element={<ShippingScreen />} />
                    <Route path="/payment" element={<PaymentScreen />} />
                    <Route path="/placeorder" element={<PlaceOrderScreen />} />
                    <Route path="/orders/:id" element={<OrderScreen />} />
                    <Route path="/profile" element={<ProfileScreen />} />
                </Route>
            </Route>
        </Routes>
    );
}

const Router = () => {
    return (
        <BrowserRouter>
            <InnerRouter />
        </BrowserRouter>
    );
};

export default Router;