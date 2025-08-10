import { Link } from "react-router-dom";
import styles from "./home.module.css";

const Home = () => {
    return (
        <div className={styles.container}>
            <h1>Go to project:</h1>
            <ul className={styles.list}>
                <li>
                    <Link to="/random-quote" className={styles.link}>
                        Your Daily Quote
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Home;
