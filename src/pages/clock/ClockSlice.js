import { createSlice } from "@reduxjs/toolkit";
import { SESSION } from "./constants/timerTypes";

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
    },
});

export const { setCurrentTimer, setSessionLength, setBreakLength, setRunTimer } = ClockSlice.actions;

export default ClockSlice.reducer;
