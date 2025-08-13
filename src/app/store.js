import { configureStore } from "@reduxjs/toolkit";
import RandomQuoteReducer from "../pages/random-quote/RandomQuoteSlice";
import clockReducer from "../pages/clock/ClockSlice";
import CalculatorReducer from "../pages/calculator/calculatorSlice";

const store = configureStore({
    reducer: {
        RandomQuote: RandomQuoteReducer,
        clock: clockReducer,
        calculator: CalculatorReducer,
    },
});

export default store;
