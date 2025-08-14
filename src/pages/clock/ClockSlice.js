import { createSlice } from "@reduxjs/toolkit";
import { BREAK, SESSION } from "./constants/timerTypes";

const ClockSlice = createSlice({
    name: "clock",
    initialState: {
        currentTimer: SESSION,
        sessionLength: 25,
        breakLength: 5,
        runTimer: false,
    },
    reducers: {
        setCurrentTimer: (state, action) => {
            state.currentTimer = action.payload;
        },
        setSessionLength: (state, action) => {
            state.sessionLength = action.payload;
        },
        setBreakLength: (state, action) => {
            state.breakLength = action.payload;
        },
        setRunTimer: (state, action) => {
            state.runTimer = action.payload;
        },
        resetTimer: (state) => {
            state.currentTimer = SESSION;
            state.sessionLength = 25;
            state.breakLength = 5;
            state.runTimer = false;
        },
        switchTimer: (state) => {
            state.currentTimer = state.currentTimer === SESSION ? BREAK : SESSION;
            state.runTimer = true;
        },
    },
});

export const { setCurrentTimer, setSessionLength, setBreakLength, setRunTimer, resetTimer, switchTimer } =
    ClockSlice.actions;

export default ClockSlice.reducer;
