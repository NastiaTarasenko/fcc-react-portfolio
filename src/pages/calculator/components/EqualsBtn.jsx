import { useSelector, useDispatch } from "react-redux";
import { setCalculatorState } from "../calculatorSlice";
import styles from "../calculator.module.css";

const EqualsBtn = () => {
    const input = useSelector((state) => state.calculator.input);
    const wasEqualed = useSelector((state) => state.calculator.wasEqualed);
    const dispatch = useDispatch();

    const onClickHandler = () => {
        if (!wasEqualed) {
            let expr = input;

            while (/[+\-*/.]$/.test(expr)) {
                expr = expr.slice(0, -1);
            }

            const result = eval(expr.replace(/·/g, "*"));

            dispatch(
                setCalculatorState({
                    input: expr + "=" + (result || NaN),
                    lastValue: result || "",
                    wasEqualed: true,
                })
            );
        }
    };
    return (
        <button className={`${styles.btn} ${styles.equals}`} onClick={onClickHandler}>
            =
        </button>
    );
};

export default EqualsBtn;
