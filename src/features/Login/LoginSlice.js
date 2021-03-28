import { createSlice } from '@reduxjs/toolkit';

export const LoginSlice = createSlice({
    name: "login",
    initialState: {
        loggedIn: false
    },
    reducers: {
        logIn: (state) => {
            state.loggedIn = true;
        },
        logOut: (state) => {
            state.loggedIn = false;
        }
    }
});

export const { logIn, logOut } = LoginSlice.actions;
export default LoginSlice.reducer;