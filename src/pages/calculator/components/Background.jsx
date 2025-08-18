import { BG_ICONS_STYLES, DARK_THEME, LIGHT_THEME, MOON_PATH, PAW_PATH, STAR_PATH, SUN_PATH } from "../constants";
import { useRef, useEffect } from "react";
import styles from "../calculator.module.css";
import gsap from "gsap";

const Background = ({ containerRef }) => {
    const theme = useRef(LIGHT_THEME);
    const themeToggleBtnRef = useRef(null);
    const themeTogglePathRef = useRef(null);
    const iconsRef = useRef([]);
    const changeToDarkTl = useRef(null);
    const changeToLightTl = useRef(null);

    useEffect(() => {
        changeToDarkTl.current = gsap.timeline({
            paused: true,
        });
        changeToDarkTl.current
            .call(() => {
                themeToggleBtnRef.current.disabled = true;
            })
            .to(themeToggleBtnRef.current, {
                opacity: 0,
                duration: 0.7,
            })
            .to(
                iconsRef.current,
                {
                    opacity: 0,
                    duration: 0.8,
                },
                "<"
            )
            .to(containerRef.current, {
                // background: "linear-gradient(180deg, #0a1a3f 0%, #000814 100%)",
                background: "linear-gradient(180deg, #050947 0%, #0a1650 50%, #1a2a80 100%)",
                duration: 0.9,
            })
            .call(() => {
                iconsRef.current.forEach((icon) => {
                    icon.setAttribute("d", STAR_PATH);
                });
                themeTogglePathRef.current.setAttribute("d", MOON_PATH);
                theme.current = DARK_THEME;
            })
            .set(iconsRef.current, {
                fill: "#f0ec0cff",
            })
            .set(themeToggleBtnRef.current, {
                y: "-110%",
            })
            .to(iconsRef.current, {
                opacity: 1,
                duration: 0.7,
                stagger: 0.2,
            })
            .to(themeToggleBtnRef.current, { opacity: 1, duration: 0.4 })
            .to(
                themeToggleBtnRef.current,
                {
                    y: "0%",
                    duration: 0.9,
                    ease: "bounce.out",
                },
                "<"
            )
            .call(() => {
                themeToggleBtnRef.current.disabled = false;
            });

        changeToLightTl.current = gsap.timeline({
            paused: true,
        });
        changeToLightTl.current
            .call(() => {
                themeToggleBtnRef.current.disabled = true;
            })
            .to(themeToggleBtnRef.current, {
                opacity: 0,
                duration: 0.7,
            })
            .to(
                iconsRef.current,
                {
                    opacity: 0,
                    duration: 0.8,
                },
                "<"
            )
            .to(containerRef.current, {
                background: "#faf7f3",
                duration: 0.9,
            })
            .call(() => {
                iconsRef.current.forEach((icon) => {
                    icon.setAttribute("d", PAW_PATH);
                });
                themeTogglePathRef.current.setAttribute("d", SUN_PATH);
                theme.current = LIGHT_THEME;
            })
            .set(iconsRef.current, {
                fill: "#ffc3c3d8",
            })
            .set(themeToggleBtnRef.current, {
                y: "-110%",
            })
            .to(iconsRef.current, {
                opacity: 1,
                duration: 0.7,
                stagger: 0.2,
            })
            .to(themeToggleBtnRef.current, { opacity: 1, duration: 0.4 })
            .to(
                themeToggleBtnRef.current,
                {
                    y: "0%",
                    duration: 0.9,
                    ease: "bounce.out",
                },
                "<"
            )
            .call(() => {
                themeToggleBtnRef.current.disabled = false;
            });

        return () => {
            changeToDarkTl.current.kill();
            changeToLightTl.current.kill();
        };
    }, [containerRef]);

    const changeTheme = () => {
        theme.current === LIGHT_THEME ? changeToDarkTl.current.restart() : changeToLightTl.current.restart();
    };

    return (
        <>
            <button onClick={changeTheme} className={styles.themeToggleBtn} ref={themeToggleBtnRef}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                >
                    <path d={SUN_PATH} ref={themeTogglePathRef} />
                </svg>
            </button>

            {BG_ICONS_STYLES.map((style, index) => (
                <svg
                    key={index}
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#ffc3c3d8"
                    className={styles.bgSvg}
                    style={style}
                >
                    <path d={PAW_PATH} ref={(el) => (iconsRef.current[index] = el)} />
                </svg>
            ))}
        </>
    );
};

export default Background;
