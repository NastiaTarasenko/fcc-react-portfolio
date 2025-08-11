import { typeConfig } from "../constants/typeConfig";
import { useSelector, useDispatch } from "react-redux";
import styles from "../clock.module.css";
import { BREAK } from "../constants/timerTypes";

const BreakSessionSettings = ({ type }) => {
    const { lengthSelector, setLength } = typeConfig[type];
    const runTimer = useSelector((state) => state.clock.runTimer);

    const length = useSelector(lengthSelector);
    const dispatch = useDispatch();

    const decrementOnClickHandler = () => {
        length !== 1 && !runTimer && dispatch(setLength(length - 1));
    };

    const incrementOnclickHandler = () => {
        length !== 60 && !runTimer && dispatch(setLength(length + 1));
    };

    return (
        <div>
            <p id={type === BREAK ? "break-label" : "session-label"}>{type} Length</p>

            <div className={styles.parametersWrapper}>
                <button className={styles.durationControls} onClick={decrementOnClickHandler}>
                    –
                </button>
                <p className={styles.duration}>{length}</p>
                <button className={styles.durationControls} onClick={incrementOnclickHandler}>
                    +
                </button>
            </div>
        </div>
    );
};

export default BreakSessionSettings;
