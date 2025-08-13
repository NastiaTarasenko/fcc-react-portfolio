import { createSlice } from "@reduxjs/toolkit";

const CalculatorSlice = createSlice({
    name: "calculator",
    initialState: {
        input: "",
        lastValue: "0",
        digitLimitMet: false,
        wasEqualed: false,
    },
    reducers: {
        setInput: (state, action) => {
            state.input = action.payload;
        },
        setLastValue: (state, action) => {
            state.lastValue = action.payload;
        },
        setDigitLimitMet: (state, action) => {
            state.digitLimitMet = action.payload;
        },
        setWasEqualed: (state, action) => {
            state.wasEqualed = action.payload;
        },
        setCalculatorState: (state, action) => {
            const { input, lastValue, digitLimitMet, wasEqualed } = action.payload;
            if (input !== undefined) state.input = input;
            if (lastValue !== undefined) state.lastValue = lastValue;
            if (digitLimitMet !== undefined) state.digitLimitMet = digitLimitMet;
            if (wasEqualed !== undefined) state.wasEqualed = wasEqualed;
        },
    },
});

const { setInput, setLastValue, setDigitLimitMet, setWasEqualed, setCalculatorState } = CalculatorSlice.actions;

export { setInput, setLastValue, setDigitLimitMet, setWasEqualed, setCalculatorState };
export default CalculatorSlice.reducer;
