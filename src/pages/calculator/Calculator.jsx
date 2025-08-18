import Menu from "../../shared/menu/Menu";
import styles from "./calculator.module.css";
import Background from "./components/Background";
import ButtonsWrapper from "./components/ButtonsWrapper";
import Cat from "./components/Cat";
import Display from "./components/Display";
import { useRef } from "react";

const Calculator = () => {
    const containerRef = useRef(null);
    return (
        <>
            <Menu />
            <h1 className={styles.title}>Calculator</h1>
            <div className={styles.container} ref={containerRef}>
                <div className={styles.wrapper}>
                    <Display />
                    <ButtonsWrapper />
                </div>
                <Background containerRef={containerRef} />
                <Cat containerRef={containerRef} />
            </div>
        </>
    );
};

export default Calculator;
