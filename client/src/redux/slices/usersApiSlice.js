import {apiSlice} from "./apiSlice";
import {USERS_URL} from "../../util/constants";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => `${USERS_URL}/profile`
        }),
    })
});

export const {useGetProfileQuery} = usersApiSlice;