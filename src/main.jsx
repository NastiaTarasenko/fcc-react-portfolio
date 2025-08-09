import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider, connect } from "react-redux";
import { store, updateAction } from "./store.js";

const mapStateToProps = (state) => {
    return {
        quoteIndex: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateQuote: (newIndex) => {
            dispatch(updateAction(newIndex));
        },
    };
};

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Provider store={store}>
            <Container />
        </Provider>
    </StrictMode>
);
