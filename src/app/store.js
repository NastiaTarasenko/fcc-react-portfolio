import { configureStore } from "@reduxjs/toolkit";
import RandomQuoteReducer from "../pages/random-quote/RandomQuoteSlice";
import clockReducer from "../pages/clock/ClockSlice";

const store = configureStore({
    reducer: {
        RandomQuote: RandomQuoteReducer,
        clock: clockReducer,
    },
});

export default store;
