import searchdataReducer from "./features/searchdata";

const { configureStore } = require("@reduxjs/toolkit");



export const store = configureStore({
    reducer:{
        searchdata:searchdataReducer
    }
})