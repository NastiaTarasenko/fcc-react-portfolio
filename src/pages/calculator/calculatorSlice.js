import { createSlice } from "@reduxjs/toolkit";
import { OPERATIONS } from "./constants";

const addOperatorHelper = (state, value) => {
    const dotMultiplication = value === "x" && "·";

    if (state.wasEqualed) {
        const result = state.input.split("=")[1] || "";
        state.input = result + (dotMultiplication || value);
        state.lastValue = value;
        state.wasEqualed = false;
    } else if (state.input === "" || state.input === "-") {
        if (value === "-") {
            state.input = "-";
            state.lastValue = "-";
        } else {
            state.input = "";
            state.lastValue = value;
        }
    } else if (OPERATIONS.includes(state.lastValue)) {
        if ((state.lastValue === "x") & (value == "-")) {
            state.input += dotMultiplication || value;
            state.lastValue = value;
        } else if (state.lastValue === "-") {
            let expr = state.input;

            while (/[+\-*/.·]$/.test(expr)) {
                expr = expr.slice(0, -1);
            }

            state.input = expr + (dotMultiplication || value);
            state.lastValue = value;
        } else {
            state.lastValue = value;
            if (value !== "-" && state.input == "-") {
                state.input = "0";
            } else {
                state.input = state.input.slice(0, -1) + (dotMultiplication || value);
            }
        }
    } else {
        state.lastValue = value;
        state.input += dotMultiplication || value;
    }
};

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
        addOperator: (state, action) => addOperatorHelper(state, action.payload),
    },
});

const { setInput, setLastValue, setDigitLimitMet, setWasEqualed, setCalculatorState, addOperator } =
    CalculatorSlice.actions;

export { setInput, setLastValue, setDigitLimitMet, setWasEqualed, setCalculatorState, addOperator };
export default CalculatorSlice.reducer;
