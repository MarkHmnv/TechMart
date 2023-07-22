import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import App from "../App";
import HomeScreen from "../screenes/HomeScreen";
import ProductScreen from "../screenes/ProductScreen";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route index={true} path="/" element={<HomeScreen/>} />
            <Route path="products/:id" element={<ProductScreen/>} />
        </Route>
    )
);