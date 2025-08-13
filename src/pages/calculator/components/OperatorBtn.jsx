import { useSelector, useDispatch } from "react-redux";
import { setCalculatorState, setLastValue, setInput } from "../calculatorSlice";
import { OPERATIONS } from "../constants";
import styles from "../calculator.module.css";

const OperatorBtn = ({ value }) => {
    const { input, lastValue, wasEqualed } = useSelector((state) => state.calculator);

    const dispatch = useDispatch();

    const onClickHandler = () => {
        const dotMultiplication = value === "x" && "·";
        if (wasEqualed) {
            const result = input.split("=")[1] || "";
            dispatch(
                setCalculatorState({
                    input: result + (dotMultiplication || value),
                    lastValue: value,
                    wasEqualed: false,
                })
            );
        } else if (input === "" || input === "-") {
            if (value === "-") {
                dispatch(
                    setCalculatorState({
                        input: "-",
                        lastValue: "-",
                    })
                );
            } else {
                dispatch(
                    setCalculatorState({
                        input: "",
                        lastValue: value,
                    })
                );
            }
        } else if (OPERATIONS.includes(lastValue)) {
            if ((lastValue === "x") & (value == "-")) {
                dispatch(
                    setCalculatorState({
                        input: input + (dotMultiplication || value),
                        lastValue: value,
                    })
                );
            } else if (lastValue === "-") {
                let expr = input;

                while (/[+\-*/.·]$/.test(expr)) {
                    expr = expr.slice(0, -1);
                }

                dispatch(
                    setCalculatorState({
                        input: expr + (dotMultiplication || value),
                        lastValue: value,
                    })
                );
            } else {
                dispatch(setLastValue(value));
                if ((value !== "-") & (input == "-")) {
                    dispatch(setInput("0"));
                } else {
                    dispatch(setInput(input.slice(0, -1) + (dotMultiplication || value)));
                }
            }
        } else {
            dispatch(setLastValue(value));
            dispatch(setInput(input + (dotMultiplication || value)));
        }
    };
    return (
        <button className={styles.btn} onClick={onClickHandler}>
            {value}
        </button>
    );
};

export default OperatorBtn;
