import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {BASE_URL} from "../../util/constants";
import {isExpired} from "../../util/jwtUtils";

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
        const { accessToken } = getState().auth;
        if (accessToken && !isExpired(accessToken)) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return headers;
    },
});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ["Product", "Order", "User"],
    endpoints: () => ({})
})