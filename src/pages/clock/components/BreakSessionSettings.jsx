import { typeConfig } from "../constants/typeConfig";
import { useSelector, useDispatch } from "react-redux";
import styles from "../clock.module.css";
import { BREAK } from "../constants/timerTypes";
import { memo } from "react";

const BreakSessionSettings = memo(({ type }) => {
    const { lengthSelector, setLength } = typeConfig[type];
    const runTimer = useSelector((state) => state.clock.runTimer);

    const length = useSelector(lengthSelector);
    const dispatch = useDispatch();

    const decrementOnClickHandler = () => {
        if (runTimer) return;
        length === 1 ? dispatch(setLength(60)) : dispatch(setLength(length - 1));
    };

    const incrementOnclickHandler = () => {
        if (runTimer) return;
        length === 60 ? dispatch(setLength(1)) : dispatch(setLength(length + 1));
    };

    return (
        <div>
            <p id={type === BREAK ? "break-label" : "session-label"}>{type} Length</p>

            <div className={styles.parametersWrapper}>
                <button className={`${styles.btn} ${styles.durationControls}`} onClick={decrementOnClickHandler}>
                    –
                </button>
                <p className={styles.duration}>{length}</p>
                <button className={`${styles.btn} ${styles.durationControls}`} onClick={incrementOnclickHandler}>
                    +
                </button>
            </div>
        </div>
    );
});

export default BreakSessionSettings;
