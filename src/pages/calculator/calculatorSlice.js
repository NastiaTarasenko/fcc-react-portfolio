import { createSlice } from "@reduxjs/toolkit";
import { OPERATIONS } from "./constants";

const addOperatorHelper = (state, value) => {
    const operator = value === "x" ? "·" : value;

    if (state.wasEqualed) {
        const result = state.input.split("=")[1] || "";
        state.input = result + operator;
        state.lastValue = value;
        state.wasEqualed = false;
        return;
    }

    if (state.input === "" || state.input === "-") {
        state.input = value === "-" ? "-" : "";
        state.lastValue = value;
        return;
    }

    if (OPERATIONS.includes(state.lastValue)) {
        if (state.lastValue === "x" && value == "-") {
            state.input += operator;
            state.lastValue = value;
            return;
        }

        if (state.lastValue === "-") {
            let expr = state.input;
            while (/[+\-*/.·]$/.test(expr)) expr = expr.slice(0, -1);
            state.input = expr + operator;
            state.lastValue = value;
            return;
        }

        state.lastValue = value;

        state.input = value !== "-" && state.input == "-" ? "0" : state.input.slice(0, -1) + operator;
        return;
    }

    state.lastValue = value;
    state.input += operator;
};

const addDecimalHelper = (state) => {
    if (state.wasEqualed) {
        state.input = "0.";
        state.lastValue = "0.";
        state.wasEqualed = false;
        return;
    }
    if (state.lastValue.includes(".")) return;

    if (state.lastValue === "" || OPERATIONS.includes(state.lastValue)) {
        state.input += "0.";
        state.lastValue = "0.";
        return;
    }
    state.input += ".";
    state.lastValue += ".";
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
        addDecimal: (state) => addDecimalHelper(state),
    },
});

const { setInput, setLastValue, setDigitLimitMet, setWasEqualed, setCalculatorState, addOperator, addDecimal } =
    CalculatorSlice.actions;

export { setInput, setLastValue, setDigitLimitMet, setWasEqualed, setCalculatorState, addOperator, addDecimal };
export default CalculatorSlice.reducer;
