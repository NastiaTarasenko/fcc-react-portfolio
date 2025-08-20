import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import randomQuoteReducer from "./RandomQuoteSlice";
import RandomQuote from "./RandomQuote";
import { Quotes } from "./constants";
import { MemoryRouter } from "react-router-dom";
import { expect } from "vitest";

const renderWithRedux = (
    component,
    { preloadedState, store = configureStore({ reducer: { randomQuote: randomQuoteReducer }, preloadedState }) } = {}
) => {
    return {
        ...render(
            <Provider store={store}>
                <MemoryRouter>{component}</MemoryRouter>
            </Provider>
        ),
        store,
    };
};

test("renders a quote and a New Quote button", () => {
    renderWithRedux(<RandomQuote />, { preloadedState: { randomQuote: { quoteIndex: 0 } } });

    expect(screen.getByRole("button", { name: /new quote/i })).toBeInTheDocument();

    const regex = new RegExp(Quotes.map((q) => q.text).join("|"));

    expect(screen.getByText(regex)).toBeInTheDocument();
});

test("displays a new quote when New Quote button is clicked", () => {
    renderWithRedux(<RandomQuote />, { preloadedState: { randomQuote: { quoteIndex: 0 } } });

    const quoteBefore = screen.getByText(new RegExp(Quotes.map((q) => q.text).join("|"))).textContent;

    fireEvent.click(screen.getByRole("button", { name: /new quote/i }));

    const quoteAfter = screen.getByText(new RegExp(Quotes.map((q) => q.text).join("|"))).textContent;

    expect(Quotes.map((q) => q.text)).toContain(quoteAfter);

    expect(quoteAfter).not.toBe(quoteBefore);
});
