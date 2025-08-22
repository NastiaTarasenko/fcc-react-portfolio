import { createSlice } from "@reduxjs/toolkit";
import { OPERATIONS } from "./constants";
import { Parser } from "expr-eval";

const parser = new Parser();

const addOperatorHelper = (state, value) => {
    const operator = value === "x" ? "·" : value;

    if (state.wasEqualed) {
        let result = state.input.split("=");
        result = result.length > 1 ? result[1] : state.input;
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

    if (state.lastValue === "0" || OPERATIONS.includes(state.lastValue)) {
        state.input += "0.";
        state.lastValue = "0.";
        return;
    }
    state.input += ".";
    state.lastValue += ".";
};

const addDigitHelper = (state, value) => {
    if (state.wasEqualed) {
        state.input = value.toString();
        state.lastValue = value.toString();
        state.wasEqualed = false;
        return;
    }

    if (state.lastValue === "0" && value == "0") return;

    if ((state.lastValue === "0" && value !== "0") || OPERATIONS.includes(state.lastValue)) {
        state.lastValue = value.toString();
    } else {
        state.lastValue = state.lastValue + value;
    }

    state.input += value;
};

export const addDigitWithLimitCheck = (value) => (dispatch, getState) => {
    const { lastValue } = getState().calculator;
    if (lastValue.length >= 20) {
        dispatch(setDigitLimitMet(true));
        setTimeout(() => {
            dispatch(setDigitLimitMet(false));
        }, 600);
        return;
    }
    dispatch(addDigit(value));
};

const calculateHelper = (state) => {
    let expr = state.input;

    if (state.wasEqualed) {
        let res = expr.split("=");
        res = res.length > 1 ? res[1] : res[0];
        state.input = res;
        state.lastValue = res;
        return;
    }

    while (/[+\-·/.]$/.test(expr)) expr = expr.slice(0, -1);

    let result;

    try {
        result = parser.evaluate(expr.replace(/·/g, "*"));
        result = parseFloat(result.toFixed(10));
    } catch {
        result = NaN;
    }

    state.input = expr + "=" + result;
    state.lastValue = result.toString();

    state.wasEqualed = true;
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
        addDigit: (state, action) => addDigitHelper(state, action.payload),
        calculate: (state) => calculateHelper(state),
    },
});

export const {
    setInput,
    setLastValue,
    setDigitLimitMet,
    setWasEqualed,
    setCalculatorState,
    addOperator,
    addDecimal,
    addDigit,
    calculate,
} = CalculatorSlice.actions;

export default CalculatorSlice.reducer;
