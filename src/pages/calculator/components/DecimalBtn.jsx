import { useDispatch } from "react-redux";
import { addDecimal } from "../calculatorSlice";
import styles from "../calculator.module.css";

const DecimalBtn = () => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(addDecimal());
    };

    return (
        <button className={styles.btn} onClick={onClickHandler}>
            .
        </button>
    );
};

export default DecimalBtn;
