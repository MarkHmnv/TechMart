import {createSlice} from "@reduxjs/toolkit";
import {apiSlice} from "./apiSlice";
import {AUTH_URL} from "../../util/constants";
import {parseJwt} from "../../util/jwtUtils";

const accessToken = localStorage.getItem("accessToken");
const name = localStorage.getItem("name");

const initialState = {
    accessToken: accessToken ? JSON.parse(accessToken) : null,
    name: name ? JSON.parse(name) : null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action) => {
            const {accessToken} = action.payload;
            const name = parseJwt(accessToken).name;
            state.accessToken = accessToken;
            state.name = name;
            localStorage.setItem("accessToken", JSON.stringify(accessToken));
            localStorage.setItem("name", JSON.stringify(name));
        },
        removeAccessToken: (state) => {
            state.accessToken = null;
            state.name = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("name");
        },
        updateName: (state, action) => {
            state.name = action.payload;
            localStorage.setItem("name", JSON.stringify(name));
        }
    }
});

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (registerRequest) => ({
                url: `${AUTH_URL}/register`,
                method: "POST",
                body: registerRequest
            })
        }),
        login: builder.mutation({
            query: (loginRequest) => ({
                url: `${AUTH_URL}/login`,
                method: "POST",
                body: loginRequest
            })
        }),
    })
})

export const {setAccessToken, removeAccessToken, updateName} = authSlice.actions;
export const {useRegisterMutation, useLoginMutation} = authApiSlice;
export default authSlice.reducer;
