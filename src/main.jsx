import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "normalize.css";
import "./index.css";
import App from "./app/App.jsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
import store from "./app/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            {/* <BrowserRouter basename="/fcc-react-portfolio"> */}
            <HashRouter>
                {/* Using HashRouter for GitHub Pages compatibility */}
                <App />
            </HashRouter>
            {/* </BrowserRouter> */}
        </Provider>
    </StrictMode>
);
