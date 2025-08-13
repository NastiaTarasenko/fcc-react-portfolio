import { useDispatch } from "react-redux";
import { addOperator } from "../calculatorSlice";
import styles from "../calculator.module.css";

const OperatorBtn = ({ value }) => {
    const dispatch = useDispatch();

    const onClickHandler = () => {
        dispatch(addOperator(value));
    };
    return (
        <button className={styles.btn} onClick={onClickHandler}>
            {value}
        </button>
    );
};

export default OperatorBtn;
