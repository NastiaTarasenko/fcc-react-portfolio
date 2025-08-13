import { useDispatch } from "react-redux";
import { calculate } from "../calculatorSlice";
import styles from "../calculator.module.css";

const EqualsBtn = () => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(calculate());
    };
    return (
        <button className={`${styles.btn} ${styles.equals}`} onClick={onClickHandler}>
            =
        </button>
    );
};

export default EqualsBtn;
