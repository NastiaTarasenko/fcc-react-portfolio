import { Quotes } from "./constants.js";

function App(props) {
    const onClickHandler = () => {
        props.updateQuote(Math.floor(Math.random() * Quotes.length));
    };

    return (
        <>
            <h1 className="title">
                <span> &#9734;</span> Your Daily Quote <span> &#9734;</span>
            </h1>
            <div className={"bg-wrapper"} style={{ backgroundColor: Quotes[props.quoteIndex].color }}>
                <div id={"quote-box"}>
                    <p id={"text"}>{Quotes[props.quoteIndex].text}</p>
                    <p id={"author"}> {Quotes[props.quoteIndex].author} </p>
                    <div className={"actions-wrapper"}>
                        <button id={"new-quote"} onClick={onClickHandler}>
                            New quote
                        </button>
                        <a id={"tweet-quote"} href={"/fake-tweet.html"} target="_blank">
                            Tweet quote
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
