import { useSelector } from "react-redux";
import styles from "../calculator.module.css";

const Display = () => {
    const { input, lastValue, digitLimitMet } = useSelector((state) => state.calculator);

    return (
        <div data-testid="display">
            <p className={styles.displayInput}>{input}</p>
            <p className={styles.displayValue}>{digitLimitMet ? "Digital limit met!" : lastValue}</p>
        </div>
    );
};

export default Display;
