import { useRef } from "react";
import BreakSessionSettings from "./components/BreakSessionSettings";
import { BREAK, SESSION } from "./constants/timerTypes";
import Timer from "./components/Timer";
import ControlBtns from "./components/ControlBtns";
import styles from "./clock.module.css";
import Menu from "../../shared/menu/Menu";

const Clock = () => {
    const soundRef = useRef(null);
    const updateTimeoutRef = useRef(null);

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
                <Timer soundRef={soundRef} updateTimeoutRef={updateTimeoutRef} />
                <ControlBtns updateTimeoutRef={updateTimeoutRef} soundRef={soundRef} />
                <audio ref={soundRef} src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav" />
            </div>{" "}
        </>
    );
};

export default Clock;
