import { useSelector, useDispatch } from "react-redux";
import { setDigitLimitMet, setCalculatorState, setLastValue, setInput } from "../calculatorSlice";
import { OPERATIONS } from "../constants";
import styles from "../calculator.module.css";

const DigitBtn = ({ value, className }) => {
    const { input, lastValue, wasEqualed } = useSelector((state) => state.calculator);
    const dispatch = useDispatch();
    const onClickHandler = () => {
        if (lastValue.length >= 20) {
            dispatch(setDigitLimitMet(true));
            setTimeout(() => {
                dispatch(setDigitLimitMet(false));
            }, 600);
        } else if (wasEqualed) {
            dispatch(
                setCalculatorState({
                    input: value.toString(),
                    lastValue: value.toString(),
                    wasEqualed: false,
                })
            );
        } else {
            if (OPERATIONS.includes(lastValue)) {
                dispatch(setLastValue(value.toString()));
            } else {
                dispatch(setLastValue(lastValue === "0" ? value.toString() : lastValue + value));
            }
            dispatch(setInput(input + value));
        }
    };
    return (
        <button onClick={onClickHandler} className={`${styles.btn} ${className}`}>
            {value}
        </button>
    );
};

export default DigitBtn;
