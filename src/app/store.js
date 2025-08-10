import { configureStore } from "@reduxjs/toolkit";
import RandomQuoteReducer from "../pages/random-quote/RandomQuoteSlice";

const store = configureStore({
    reducer: {
        RandomQuote: RandomQuoteReducer,
    },
});

export default store;
