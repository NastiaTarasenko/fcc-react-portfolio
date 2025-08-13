// import { Quotes } from "./constants.js";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import RandomQuote from "../pages/random-quote/RandomQuote";
import FakeTweet from "../pages/fake-tweet/FakeTweet";
import Clock from "../pages/clock/Clock";
import Calculator from "../pages/calculator/Calculator";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/random-quote" element={<RandomQuote />} />
                <Route path="/fake-tweet" element={<FakeTweet />} />
                <Route path="/clock" element={<Clock />} />
                <Route path="/calculator" element={<Calculator />} />
            </Routes>
        </>
    );
}

export default App;
