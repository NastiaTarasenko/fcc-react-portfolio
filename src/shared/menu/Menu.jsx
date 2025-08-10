import styles from "./menu.module.css";
import MenuToggleIcon from "../icons/MenuToggleIcon.jsx";
import { useState, useRef, useEffect } from "react";
import { menuItems } from "./constants.js";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";

const Menu = () => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const itemsRef = useRef([]);
    const tl = useRef(null);
    const location = useLocation();

    useEffect(() => {
        tl.current = gsap.timeline({
            paused: true,
        });

        tl.current.to(itemsRef.current, {
            y: (i) => `${(i + 1) * 3.8 + 0.4}rem`,
            stagger: 0.1,
            duration: 0.3,
            zIndex: 1,
        });
    }, []);

    useEffect(() => {
        menuIsOpen ? tl.current.play() : tl.current.reverse();
    }, [menuIsOpen]);

    return (
        <div className={styles.container}>
            <MenuToggleIcon menuIsOpen={menuIsOpen} setMenuIsOpen={setMenuIsOpen} />
            <nav>
                <ul className={styles.list}>
                    {menuItems.map((item, index) => {
                        const { Icon } = item;
                        return (
                            <li
                                key={item.id}
                                className={`${styles.menuItem} ${location.pathname === item.path ? styles.activeItem : ""} `}
                                ref={(el) => (itemsRef.current[index] = el)}
                            >
                                <Link to={item.path} className={styles.link}>
                                    <Icon />
                                </Link>
                                <p className={styles.labelWrapper}>
                                    <span>{item.label}</span>
                                </p>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </div>
    );
};
export default Menu;
