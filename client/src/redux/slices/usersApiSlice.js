import {apiSlice} from "./apiSlice";
import {USERS_URL} from "../../util/constants";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => `${USERS_URL}/profile`
        }),
        updateProfile: builder.mutation({
            query: (updateRequest) => ({
                url: `${USERS_URL}/profile`,
                method: "PATCH",
                body: updateRequest
            })
        }),
    })
});

export const {useGetProfileQuery, useUpdateProfileMutation} = usersApiSlice;