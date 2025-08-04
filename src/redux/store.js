import alldataReducer from "./features/alldata";
import searchdataReducer from "./features/searchdata";

const { configureStore } = require("@reduxjs/toolkit");



export const store = configureStore({
    reducer:{
        searchdata:searchdataReducer,
        alldata:alldataReducer
    }
})