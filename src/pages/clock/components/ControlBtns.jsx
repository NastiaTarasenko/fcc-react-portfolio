import { useSelector, useDispatch } from "react-redux";
import { setRunTimer, setCurrentTimer, setSessionLength, setBreakLength } from "../ClockSlice";
import { SESSION } from "../constants/timerTypes";
import styles from "../clock.module.css";

const ControlBtns = ({ updateTimeoutRef, soundRef }) => {
    const runTimer = useSelector((state) => state.clock.runTimer);

    const dispatch = useDispatch();

    const startStopOnClickHandler = () => {
        dispatch(setRunTimer(!runTimer));
    };

    const resetOnClickHandler = () => {
        soundRef.current.currentTime = 0;
        soundRef.current.pause();
        dispatch(setCurrentTimer(SESSION));
        dispatch(setSessionLength(25));
        dispatch(setBreakLength(5));
        dispatch(setRunTimer(false));
        if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current);
            updateTimeoutRef.current = null;
        }
    };

    return (
        <div className={styles.controlsWrapper}>
            <button className={styles.controlsBtn} onClick={startStopOnClickHandler}>
                Start/Stop
            </button>
            <button className={styles.controlsBtn} onClick={resetOnClickHandler}>
                Reset
            </button>
        </div>
    );
};

export default ControlBtns;
