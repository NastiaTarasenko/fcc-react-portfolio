import { useSelector, useDispatch } from "react-redux";
import { setCalculatorState } from "../calculatorSlice";
import { OPERATIONS } from "../constants";
import styles from "../calculator.module.css";

const DecimalBtn = () => {
    const { input, lastValue, wasEqualed } = useSelector((state) => state.calculator);
    const dispatch = useDispatch();

    const onClickHandler = () => {
        if (wasEqualed) {
            dispatch(
                setCalculatorState({
                    input: "0.",
                    lastValue: "0.",
                    wasEqualed: false,
                })
            );
        } else if (lastValue == "" || OPERATIONS.includes(lastValue)) {
            dispatch(
                setCalculatorState({
                    input: input + "0.",
                    lastValue: "0.",
                })
            );
        } else if (lastValue.includes(".")) {
            return;
        } else {
            dispatch(
                setCalculatorState({
                    input: input + ".",
                    lastValue: lastValue + ".",
                })
            );
        }
    };
    return (
        <button className={styles.btn} onClick={onClickHandler}>
            .
        </button>
    );
};

export default DecimalBtn;
