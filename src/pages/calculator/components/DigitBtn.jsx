import { useDispatch } from "react-redux";
import { addDigitWithLimitCheck } from "../calculatorSlice";
import styles from "../calculator.module.css";

const DigitBtn = ({ value, className }) => {
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(addDigitWithLimitCheck(value));
    };
    return (
        <button onClick={onClickHandler} className={`${styles.btn} ${className}`} aria-label={`Digit ${value}`}>
            {value}
        </button>
    );
};

export default DigitBtn;
