import { useSelector, useDispatch } from "react-redux";
import { typeConfig } from "../constants/typeConfig";
import { useState, useRef, useEffect } from "react";
import { setRunTimer, setCurrentTimer } from "../ClockSlice";
import { SESSION, BREAK } from "../constants/timerTypes";
import styles from "../clock.module.css";

const Timer = ({ soundRef, updateTimeoutRef }) => {
    const currentTimer = useSelector((state) => state.clock.currentTimer);
    const length = useSelector(typeConfig[currentTimer].lengthSelector);
    const [timeLeft, setTimeLeft] = useState(length * 60);
    const runTimer = useSelector((state) => state.clock.runTimer);
    const timerIntervalRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeLeft(length * 60);
    }, [length, currentTimer]);

    useEffect(() => {
        if (runTimer) {
            timerIntervalRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    return prev > 0 ? prev - 1 : 0;
                });
            }, 1000);
        } else {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = 0;
        }
        return () => clearInterval(timerIntervalRef.current);
    }, [runTimer, currentTimer]);

    useEffect(() => {
        if (timeLeft === 0 && runTimer) {
            if (soundRef.current) {
                soundRef.current.play();
                dispatch(setRunTimer(false));

                updateTimeoutRef.current = setTimeout(() => {
                    dispatch(setCurrentTimer(currentTimer === SESSION ? BREAK : SESSION));
                    dispatch(setRunTimer(true));
                    soundRef.current.pause();
                }, 3000);
            }
        }
    }, [timeLeft, runTimer, currentTimer, dispatch, soundRef, updateTimeoutRef]);

    const mins = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;

    return (
        <div className={styles.timerWrapper}>
            <p className={styles.timerLabel}>{currentTimer}</p>
            <p className={styles.timeLeft} style={{ color: timeLeft < 60 ? "#d9111f" : "inherit" }}>
                {mins < 10 ? `0${mins}` : mins}:{sec < 10 ? `0${sec}` : sec}
            </p>
        </div>
    );
};

export default Timer;
