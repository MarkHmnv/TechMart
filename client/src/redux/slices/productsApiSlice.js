import {apiSlice} from "./apiSlice";
import {PRODUCTS_URL} from "../../util/constants";

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => PRODUCTS_URL
        }),
        getProductById: builder.query({
            query: (id) => `${PRODUCTS_URL}/${id}`
        })
    })
});

export const {useGetProductsQuery, useGetProductByIdQuery} = productsApiSlice;