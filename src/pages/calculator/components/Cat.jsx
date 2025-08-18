import styles from "../calculator.module.css";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const Cat = ({ containerRef }) => {
    const catRef = useRef(null);
    const walkTl = useRef(null);
    const moveTl = useRef(null);

    useEffect(() => {
        const positions = ["0%", "17%", "34%", "51%", "68%", "85%", "102%"];

        walkTl.current = gsap.timeline({
            repeat: -1,
        });
        positions.forEach((pos) => {
            walkTl.current.set(catRef.current, { backgroundPosition: `${pos} 0%` });
            walkTl.current.to({}, { duration: 0.4 });
        });

        moveTl.current = gsap.timeline({ repeat: -1, defaults: { ease: "linear" } });
        moveTl.current.set(catRef.current, { x: 0, scaleX: 1, transformOrigin: "50% 100%" });

        moveTl.current
            .to(catRef.current, {
                x: containerRef.current.offsetWidth - catRef.current.offsetWidth,
                duration: 15,
            })
            .set(catRef.current, { scaleX: -1 })
            .to(catRef.current, {
                x: 0,
                duration: 15,
            })
            .set(catRef.current, { scaleX: 1 });
        return () => {
            walkTl.current?.kill();
            moveTl.current?.kill();
        };
    }, [containerRef]);

    return <div className={styles.cat} ref={catRef}></div>;
};

export default Cat;
