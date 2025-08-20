import styles from "./random-quote.module.css";
import { Quotes } from "./constants.js";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateQuote } from "./RandomQuoteSlice.js";
import { Link } from "react-router-dom";
import Menu from "../../shared/menu/Menu.jsx";

const RandomQuote = () => {
    const quoteIndex = useSelector((state) => state.randomQuote.quoteIndex);
    const dispatch = useDispatch();

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * Quotes.length);
        dispatch(updateQuote(randomIndex));
    }, []);

    const onClichkHandler = () => {
        const newIndex = Math.floor(Math.random() * Quotes.length);
        dispatch(updateQuote(newIndex));
    };

    return (
        <>
            <Menu />
            <h1 className={styles.title}>
                <span> &#9734;</span> Your Daily Quote <span> &#9734;</span>
            </h1>

            <div className={styles.bgWrapper} style={{ backgroundColor: Quotes[quoteIndex].color }}>
                <div className={styles.quoteBox}>
                    <p className={styles.text}>{Quotes[quoteIndex].text}</p>
                    <p className={styles.author}> {Quotes[quoteIndex].author} </p>

                    <div className={styles.actionsWrapper}>
                        <button className={styles.newQuote} onClick={onClichkHandler}>
                            New quote
                        </button>

                        <Link className={styles.tweetQuote} to="/fake-tweet">
                            Tweet quote
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RandomQuote;
