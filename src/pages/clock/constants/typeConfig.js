import { setBreakLength, setSessionLength } from "../ClockSlice";
import { BREAK, SESSION } from "./timerTypes";

export const typeConfig = {
    [BREAK]: {
        lengthSelector: (state) => state.clock.breakLength,
        setLength: setBreakLength,
    },

    [SESSION]: {
        lengthSelector: (state) => state.clock.sessionLength,
        setLength: setSessionLength,
    },
};
