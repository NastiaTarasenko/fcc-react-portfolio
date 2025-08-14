import { useSelector, useDispatch } from "react-redux";
import { setRunTimer, resetTimer } from "../ClockSlice";
import styles from "../clock.module.css";
import { useCallback, useEffect } from "react";

const ControlBtns = ({ updateTimeoutRef, soundRef, setTimeLeft }) => {
    const runTimer = useSelector((state) => state.clock.runTimer);

    const dispatch = useDispatch();

    const startStopOnClickHandler = () => {
        dispatch(setRunTimer(!runTimer));
    };

    const resetFunc = useCallback(() => {
        if (soundRef.current) {
            soundRef.current.currentTime = 0;
            soundRef.current.pause();
        }

        dispatch(resetTimer());
        if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current);
            updateTimeoutRef.current = null;
        }
        setTimeLeft(25 * 60);
    }, [dispatch, soundRef, updateTimeoutRef, setTimeLeft]);

    useEffect(() => {
        return () => {
            resetFunc();
        };
    }, [resetFunc]);

    return (
        <div className={styles.controlsWrapper}>
            <button className={`${styles.btn} ${styles.controlsBtn}`} onClick={startStopOnClickHandler}>
                Start/Stop
            </button>
            <button className={`${styles.btn} ${styles.controlsBtn}`} onClick={resetFunc}>
                Reset
            </button>
        </div>
    );
};

export default ControlBtns;
