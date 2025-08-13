import ACBtn from "./ACBtn";
import OperatorBtn from "./OperatorBtn";
import EqualsBtn from "./EqualsBtn";
import DecimalBtn from "./DecimalBtn";
import DigitBtn from "./DigitBtn";
import styles from "../calculator.module.css";

const ButtonsWrapper = () => {
    return (
        <div className={styles.buttonsWrapper}>
            <ACBtn />
            <OperatorBtn value={"/"} />
            <OperatorBtn value={"x"} />
            <DigitBtn value={7} />
            <DigitBtn value={8} />
            <DigitBtn value={9} />
            <OperatorBtn value={"-"} />
            <DigitBtn value={4} />
            <DigitBtn value={5} />
            <DigitBtn value={6} />
            <OperatorBtn value={"+"} />
            <DigitBtn value={1} />
            <DigitBtn value={2} />
            <DigitBtn value={3} />
            <EqualsBtn />
            <DigitBtn className={styles.zero} value={0} />
            <DecimalBtn />
        </div>
    );
};

export default ButtonsWrapper;
