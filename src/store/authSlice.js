import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Status: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        login:(state,action) => {
            state.Status = true;
            state.userData = action.payload.userData;   //or just action.payload
        },

        logout:(state) => {
            state.Status = false;
            state.userData = null;
        },
    }
});

export const {login,logout} = authSlice.actions;

export default authSlice.reducer;