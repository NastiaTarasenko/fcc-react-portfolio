import { createStore } from "redux";
import { UPDATE, Quotes } from "./constants.js";

const reducer = (state = Math.floor(Math.random() * Quotes.length), action) => {
    switch (action.type) {
        case UPDATE:
            return action.newIndex;
        default:
            return state;
    }
};

export const updateAction = (index) => {
    return {
        type: UPDATE,
        newIndex: index,
    };
};

export const store = createStore(reducer);
