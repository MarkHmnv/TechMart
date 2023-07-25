import {apiSlice} from "./apiSlice";
import {ORDERS_URL, PAYPAL_URL} from "../../util/constants";

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createOrder: builder.mutation({
            query: order => ({
                url: ORDERS_URL,
                method: "POST",
                body: {...order}
            })
        }),
        getOrderById: builder.query({
            query: id => `${ORDERS_URL}/${id}`
        }),
        payOrder: builder.mutation({
            query: ({id, details}) => ({
                url: `${ORDERS_URL}/${id}/pay`,
                method: "PATCH",
                body: {...details}
            })
        }),
        getPayPalClientId: builder.query({
            query: () => PAYPAL_URL
        })
    })
});

export const {useCreateOrderMutation, useGetOrderByIdQuery, usePayOrderMutation, useGetPayPalClientIdQuery} = ordersApiSlice;