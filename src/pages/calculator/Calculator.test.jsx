import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import calculatorReducer from "./calculatorSlice";
import Calculator from "./Calculator";
import { beforeEach, describe, test } from "vitest";

const renderWithRedux = (
    component,
    { preloadedState, store = configureStore({ reducer: { calculator: calculatorReducer }, preloadedState }) } = {}
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

describe("Rendering", () => {
    beforeEach(() => {
        renderWithRedux(<Calculator />, {
            preloadedState: {
                calculator: {
                    input: "",
                    lastValue: "0",
                    digitLimitMet: false,
                    wasEqualed: false,
                },
            },
        });
    });

    test("renders the calculator component", async () => {});

    test("renders all buttons", async () => {
        const digitButtons = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        for (const button of digitButtons) {
            expect(await screen.findByRole("button", { name: `Digit ${button}` })).toBeInTheDocument();
        }

        const funcButtons = ["+", "-", "x", "/", "=", "AC"];
        for (const button of funcButtons) {
            expect(await screen.findByRole("button", { name: button })).toBeInTheDocument();
        }
    });

    test("renders the display", async () => {
        expect(await screen.findByTestId("display")).toBeInTheDocument();
    });
});

describe("Functionality", () => {
    beforeEach(() => {
        renderWithRedux(<Calculator />, {
            preloadedState: {
                calculator: {
                    input: "",
                    lastValue: "0",
                    digitLimitMet: false,
                    wasEqualed: false,
                },
            },
        });
    });

    test("inputs digits and updates display", async () => {
        const btn1 = await screen.findByRole("button", { name: "Digit 1" });
        const btn2 = await screen.findByRole("button", { name: "Digit 2" });
        await act(async () => {
            btn1.click();
            btn2.click();
        });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[0].textContent).toBe("12"); // expression row
        expect(rows[1].textContent).toBe("12"); // current value row
    });

    test("leading zeros are handled correctly", async () => {
        const btn0 = await screen.findByRole("button", { name: "Digit 0" });
        const btn1 = await screen.findByRole("button", { name: "Digit 1" });
        await act(async () => {
            btn0.click();
            btn0.click();
            btn1.click();
        });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[1].textContent).toBe("1");
    });

    test("inputs operator and updates display", async () => {
        const btn3 = await screen.findByRole("button", { name: "Digit 3" });
        const btnPlus = await screen.findByRole("button", { name: "+" });
        await act(async () => {
            btn3.click();
            btnPlus.click();
        });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[0].textContent).toBe("3+");
        expect(rows[1].textContent).toBe("+");
    });

    test("calculates result with equals", async () => {
        const btn4 = await screen.findByRole("button", { name: "Digit 4" });
        const btn5 = await screen.findByRole("button", { name: "Digit 5" });
        const btnPlus = await screen.findByRole("button", { name: "+" });
        const btnEqual = await screen.findByRole("button", { name: "=" });
        await act(async () => {
            btn4.click();
            btnPlus.click();
            btn5.click();
            btnEqual.click();
        });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[0].textContent).toBe("4+5=9"); // expression=result
        expect(rows[1].textContent).toBe("9"); // result only
    });

    test("clears display with AC", async () => {
        const btn6 = await screen.findByRole("button", { name: "Digit 6" });
        const btnAC = await screen.findByRole("button", { name: "AC" });
        await act(async () => {
            btn6.click();
            btnAC.click();
        });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[0].textContent).toBe("");
        expect(rows[1].textContent).toBe("0");
    });

    test("multiple AC clicks keep display at zero", async () => {
        const btnAC = await screen.findByRole("button", { name: "AC" });
        await act(async () => {
            btnAC.click();
            btnAC.click();
        });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[1].textContent).toBe("0");
    });

    test("chains operations", async () => {
        const btn7 = await screen.findByRole("button", { name: "Digit 7" });
        const btnMinus = await screen.findByRole("button", { name: "-" });
        const btn2 = await screen.findByRole("button", { name: "Digit 2" });
        const btnEqual = await screen.findByRole("button", { name: "=" });
        await act(async () => {
            btn7.click();
            btnMinus.click();
            btn2.click();
            btnEqual.click();
        });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[0].textContent).toBe("7-2=5");
        expect(rows[1].textContent).toBe("5");
    });

    test("handles multiple operators", async () => {
        const btn8 = await screen.findByRole("button", { name: "Digit 8" });
        const btnDivide = await screen.findByRole("button", { name: "/" });
        const btnMultiply = await screen.findByRole("button", { name: "x" });
        await act(async () => {
            btn8.click();
            btnDivide.click();
            btnMultiply.click();
        });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[0].textContent).toBe("8·"); // last operator shown in expression
        expect(rows[1].textContent).toBe("x"); // current operator
    });

    test("multiplying by a negative number works", async () => {
        const btn2 = await screen.findByRole("button", { name: "Digit 2" });
        const btnMultiply = await screen.findByRole("button", { name: "x" });
        const btnMinus = await screen.findByRole("button", { name: "-" });
        const btn3 = await screen.findByRole("button", { name: "Digit 3" });
        const btnEqual = await screen.findByRole("button", { name: "=" });
        await act(async () => {
            btn2.click();
            btnMultiply.click();
            btnMinus.click();
            btn3.click();
            btnEqual.click();
        });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[0].textContent).toBe("2·-3=-6");
        expect(rows[1].textContent).toBe("-6");
    });

    test("handles starting with operator", async () => {
        const btnPlus = await screen.findByRole("button", { name: "+" });
        const btnMinus = await screen.findByRole("button", { name: "-" });
        await act(async () => {
            btnPlus.click();
        });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[0].textContent).toBe("");
        expect(rows[1].textContent).toBe("+");

        await act(async () => {
            btnMinus.click();
        });
        expect(rows[0].textContent).toBe("-");
        expect(rows[1].textContent).toBe("-");
    });

    test("operator after equals appends operator to result", async () => {
        const btn2 = await screen.findByRole("button", { name: "Digit 2" });
        const btnPlus = await screen.findByRole("button", { name: "+" });
        const btn3 = await screen.findByRole("button", { name: "Digit 3" });
        const btnEqual = await screen.findByRole("button", { name: "=" });
        await act(async () => {
            btn2.click();
            btnPlus.click();
            btn3.click();
            btnEqual.click();
        });
        const btnMinus = await screen.findByRole("button", { name: "-" });
        await act(async () => {
            btnMinus.click();
        });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[0].textContent).toBe("5-");
        expect(rows[1].textContent).toBe("-");
    });

    test("handles consecutive equals", async () => {
        const btn1 = await screen.findByRole("button", { name: "Digit 1" });
        const btnPlus = await screen.findByRole("button", { name: "+" });
        const btn2 = await screen.findByRole("button", { name: "Digit 2" });
        const btnEqual = await screen.findByRole("button", { name: "=" });
        await act(async () => {
            btn1.click();
            btnPlus.click();
            btn2.click();
            btnEqual.click();
            btnEqual.click();
        });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[0].textContent).toBe("3");
        expect(rows[1].textContent).toBe("3");
    });

    test("handles decimal arithmetic", async () => {
        const btn0 = await screen.findByRole("button", { name: "Digit 0" });
        const btnDot = await screen.findByRole("button", { name: "." });
        const btn1 = await screen.findByRole("button", { name: "Digit 1" });
        const btn2 = await screen.findByRole("button", { name: "Digit 2" });
        const btnPlus = await screen.findByRole("button", { name: "+" });
        const btnEqual = await screen.findByRole("button", { name: "=" });

        // 0.1 + 0.2 = 0.3
        await act(async () => {
            btn0.click();
            btnDot.click();
            btn1.click();
            btnPlus.click();
            btn0.click();
            btnDot.click();
            btn2.click();
            btnEqual.click();
        });

        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[1].textContent).toBe("0.3");
    });

    test("handles starting with decimal", async () => {
        const btnDot = await screen.findByRole("button", { name: "." });
        const btn5 = await screen.findByRole("button", { name: "Digit 5" });
        await act(async () => {
            btnDot.click();
            btn5.click();
        });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[0].textContent).toBe("0.5");
        expect(rows[1].textContent).toBe("0.5");
    });
});

describe("Edge cases", () => {
    beforeEach(() => {
        renderWithRedux(<Calculator />, {
            preloadedState: {
                calculator: {
                    input: "",
                    lastValue: "0",
                    digitLimitMet: false,
                    wasEqualed: false,
                },
            },
        });
    });

    test("limits digit input", async () => {
        const btn9 = await screen.findByRole("button", { name: "Digit 9" });
        for (let i = 0; i < 25; i++)
            await act(async () => {
                btn9.click();
            });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[1].textContent.length).toBeLessThanOrEqual(20);
    });

    test("does not allow multiple decimals in a number", async () => {
        const btnDot = await screen.findByRole("button", { name: "." });
        await act(async () => {
            btnDot.click();
            btnDot.click();
        });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        expect(rows[1].textContent.match(/\./g).length).toBe(1);
    });

    test("handles division by zero", async () => {
        const btn8 = await screen.findByRole("button", { name: "Digit 8" });
        const btn0 = await screen.findByRole("button", { name: "Digit 0" });
        const btnDivide = await screen.findByRole("button", { name: "/" });
        const btnMinus = await screen.findByRole("button", { name: "-" });
        const btnEqual = await screen.findByRole("button", { name: "=" });

        // 8 ÷ 0 = Infinity
        await act(async () => {
            btn8.click();
            btnDivide.click();
            btn0.click();
            btnEqual.click();
        });
        let display = screen.getByTestId("display");
        let rows = display.querySelectorAll("p");
        expect(rows[0].textContent).toBe("8/0=Infinity");
        expect(rows[1].textContent).toBe("Infinity");

        // Clear for next test
        const btnAC = await screen.findByRole("button", { name: "AC" });
        await act(async () => {
            btnAC.click();
        });

        // 0 ÷ 0 = NaN
        await act(async () => {
            btn8.click();
            btnMinus.click();
            btn8.click();
            btnEqual.click();
            btnDivide.click();
            btn0.click();
            btnEqual.click();
        });
        display = screen.getByTestId("display");
        rows = display.querySelectorAll("p");
        expect(rows[0].textContent).toBe("0/0=NaN");
        expect(rows[1].textContent).toBe("NaN");
    });

    test("handles long numbers", async () => {
        const btn9 = await screen.findByRole("button", { name: "Digit 9" });
        const btnMultiply = await screen.findByRole("button", { name: "x" });
        const btnEqual = await screen.findByRole("button", { name: "=" });

        // Input a very large number: 9999999999999999 x 9999999999999999
        for (let i = 0; i < 16; i++) {
            await act(async () => {
                btn9.click();
            });
        }
        await act(async () => {
            btnMultiply.click();
        });
        for (let i = 0; i < 16; i++) {
            await act(async () => {
                btn9.click();
            });
        }
        await act(async () => {
            btnEqual.click();
        });

        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        const result = rows[1].textContent;
        expect(result).toMatch(/e\+|\d{10,}/);
    });

    test("handles operator at start with equals", async () => {
        const btnMinus = await screen.findByRole("button", { name: "-" });
        const btnEqual = await screen.findByRole("button", { name: "=" });
        await act(async () => {
            btnMinus.click();
            btnEqual.click();
        });
        const display = screen.getByTestId("display");
        const rows = display.querySelectorAll("p");
        // Only "-" then "=" should result in "0"
        expect(rows[0].textContent).toBe("0");
        expect(rows[1].textContent).toBe("0");

        // Try with "+"
        const btnAC = await screen.findByRole("button", { name: "AC" });
        const btnPlus = await screen.findByRole("button", { name: "+" });
        await act(async () => {
            btnAC.click();
            btnPlus.click();
            btnEqual.click();
        });
        const display2 = screen.getByTestId("display");
        const rows2 = display2.querySelectorAll("p");
        // Only "+" then "=" should result in "NaN"
        expect(rows2[0].textContent).toBe("=NaN");
        expect(rows2[1].textContent).toBe("NaN");
    });
});
