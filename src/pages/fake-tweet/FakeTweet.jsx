import { Link } from "react-router-dom";
import ReturnIcon from "../../shared/icons/ReturnIcon";
import styles from "./fake-tweet.module.css";

const FakeTweet = () => {
    return (
        <>
            <Link to="/random-quote" className={styles.iconWrapper}>
                <ReturnIcon />
            </Link>
            <div className={styles.tweetBox}>
                <h1 className={`${styles.line} ${styles.line1}`}>Posting your quote...</h1>
                <h2 className={`${styles.line} ${styles.line2}`}>Congrats, your quote was successfully posted :)</h2>
                <h2 className={`${styles.line} ${styles.line3}`}>Ready for the next one?</h2>
                <h2 className={`${styles.line} ${styles.line4}`}>Keep going, you’re doing great.</h2>
                <h2 className={`${styles.line} ${styles.line5}`}>(Just kidding — this is a placeholder page.)</h2>
            </div>
        </>
    );
};

export default FakeTweet;
