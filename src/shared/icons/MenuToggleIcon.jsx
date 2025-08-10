import { useRef } from "react";
import gsap from "gsap";
import styles from "../menu/menu.module.css";

const MenuToggleIcon = ({ menuIsOpen, setMenuIsOpen }) => {
    const burgerPath = "M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z";
    const crossPath =
        "m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z";

    const svgRef = useRef(null);

    const OnClickHandler = () => {
        gsap.to(svgRef.current, {
            duration: 0.2,
            scale: 0,
            transformOrigin: "center center",
            ease: "power1.in",
            onComplete: () => {
                setMenuIsOpen(!menuIsOpen);
                gsap.to(svgRef.current, {
                    duration: 0.3,
                    scale: 1,
                    transformOrigin: "center center",
                    ease: "power1.out",
                });
            },
        });
    };

    return (
        <div className={styles.menuToggle} onClick={OnClickHandler}>
            <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#5a2807">
                <path d={menuIsOpen ? crossPath : burgerPath} />
            </svg>
        </div>
    );
};

export default MenuToggleIcon;
