// import { Quotes } from "./constants.js";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import RandomQuote from "../pages/random-quote/RandomQuote";
import FakeTweet from "../pages/fake-tweet/FakeTweet";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/random-quote" element={<RandomQuote />} />
                <Route path="/fake-tweet" element={<FakeTweet />} />
            </Routes>
        </>
    );
}

export default App;
