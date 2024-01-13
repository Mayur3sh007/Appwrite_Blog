import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from './authSlice';             //We can name this as anything as we have exported it as default 

const store = configureStore({
    reducer: {
        auth : authSliceReducer
    }
})

export default store;