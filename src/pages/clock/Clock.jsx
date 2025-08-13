import { useRef, useState, useEffect } from "react";
import BreakSessionSettings from "./components/BreakSessionSettings";
import { BREAK, SESSION } from "./constants/timerTypes";
import Timer from "./components/Timer";
import ControlBtns from "./components/ControlBtns";
import styles from "./clock.module.css";
import Menu from "../../shared/menu/Menu";
import { useSelector } from "react-redux";
import { typeConfig } from "./constants/typeConfig";

const Clock = () => {
    const soundRef = useRef(null);
    const updateTimeoutRef = useRef(null);
    const currentTimer = useSelector((state) => state.clock.currentTimer);
    const length = useSelector(typeConfig[currentTimer].lengthSelector);
    const [timeLeft, setTimeLeft] = useState(length * 60);

    useEffect(() => {
        setTimeLeft(length * 60);
    }, [length, currentTimer]);

    return (
        <>
            <Menu />
            <h1 className={styles.title}>
                <span>&#x2726;</span> 25 + 5 Clock <span>&#x2726;</span>
            </h1>
            <div className={styles.container}>
                <div className={styles.settingsWrapper}>
                    <BreakSessionSettings type={BREAK} />
                    <BreakSessionSettings type={SESSION} />
                </div>
                <Timer
                    soundRef={soundRef}
                    updateTimeoutRef={updateTimeoutRef}
                    timeLeft={timeLeft}
                    setTimeLeft={setTimeLeft}
                />
                <ControlBtns updateTimeoutRef={updateTimeoutRef} soundRef={soundRef} setTimeLeft={setTimeLeft} />
                <audio ref={soundRef} src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" />
            </div>
        </>
    );
};

export default Clock;
