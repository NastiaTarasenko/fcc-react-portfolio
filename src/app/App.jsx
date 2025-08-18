import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/Home";
import { lazy, Suspense } from "react";

const RandomQuote = lazy(() => import("../pages/random-quote/RandomQuote"));
const FakeTweet = lazy(() => import("../pages/fake-tweet/FakeTweet"));
const Clock = lazy(() => import("../pages/clock/Clock"));
const Calculator = lazy(() => import("../pages/calculator/Calculator"));

function App() {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/random-quote" element={<RandomQuote />} />
                    <Route path="/fake-tweet" element={<FakeTweet />} />
                    <Route path="/clock" element={<Clock />} />
                    <Route path="/calculator" element={<Calculator />} />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
