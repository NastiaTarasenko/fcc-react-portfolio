import Menu from "../../shared/menu/Menu";
import styles from "./calculator.module.css";
import ButtonsWrapper from "./components/ButtonsWrapper";
import Display from "./components/Display";

const Calculator = () => {
    return (
        <>
            <Menu />
            <h1 className={styles.title}>Calculator</h1>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <Display />
                    <ButtonsWrapper />
                </div>
            </div>
        </>
    );
};

export default Calculator;
