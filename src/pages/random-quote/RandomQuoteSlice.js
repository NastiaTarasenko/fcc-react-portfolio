import { createSlice } from "@reduxjs/toolkit";

const RandomQuoteSlice = createSlice({
    name: "randomQuote",
    initialState: {
        quoteIndex: 0,
    },
    reducers: {
        updateQuote: (state, action) => {
            state.quoteIndex = action.payload;
        },
    },
});

export const { updateQuote } = RandomQuoteSlice.actions;
export default RandomQuoteSlice.reducer;
