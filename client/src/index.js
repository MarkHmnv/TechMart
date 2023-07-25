import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routes/Router';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {PayPalScriptProvider} from "@paypal/react-paypal-js";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PayPalScriptProvider>
                <Router />
            </PayPalScriptProvider>
        </Provider>
    </React.StrictMode>
);