import { useDispatch } from "react-redux";
import { setCalculatorState } from "../calculatorSlice";
import styles from "../calculator.module.css";

const ACBtn = () => {
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(
            setCalculatorState({
                input: "",
                lastValue: "0",
                wasEqualed: false,
            })
        );
    };
    return (
        <button className={`${styles.btn} ${styles.clear}`} onClick={onClickHandler}>
            AC
        </button>
    );
};

export default ACBtn;
