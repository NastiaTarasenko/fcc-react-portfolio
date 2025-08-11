// import { Quotes } from "./constants.js";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import RandomQuote from "../pages/random-quote/RandomQuote";
import FakeTweet from "../pages/fake-tweet/FakeTweet";
import Clock from "../pages/clock/Clock";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/random-quote" element={<RandomQuote />} />
                <Route path="/fake-tweet" element={<FakeTweet />} />
                <Route path="/clock" element={<Clock />} />
            </Routes>
        </>
    );
}

export default App;
