import { render, screen, fireEvent, act } from "@testing-library/react";
import Clock from "./Clock";
import { Provider } from "react-redux";
import store from "../../app/store";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, vi } from "vitest";

const renderWithProviders = (ui) =>
    render(
        <Provider store={store}>
            <MemoryRouter>{ui}</MemoryRouter>
        </Provider>
    );

// Mock not implemented audio methods for jsdom
Object.defineProperty(window.HTMLMediaElement.prototype, "play", {
    configurable: true,
    value: vi.fn(),
});
Object.defineProperty(window.HTMLMediaElement.prototype, "pause", {
    configurable: true,
    value: vi.fn(),
});

describe("Clock rendering and accessibility", () => {
    beforeEach(() => {
        renderWithProviders(<Clock />);
    });

    test("renders Clock component without crashing", () => {});

    test("renders all accessible control buttons", () => {
        expect(screen.getByRole("button", { name: /start/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /increase session/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /decrease session/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /increase break/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /decrease break/i })).toBeInTheDocument();
    });
});

describe("Session and break length controls", () => {
    beforeEach(() => {
        renderWithProviders(<Clock />);
    });

    test("displays initial session time as 25:00", () => {
        expect(screen.getByText(/25:00/)).toBeInTheDocument();
    });

    test("increments session length when increase button is clicked", async () => {
        const incButton = screen.getByRole("button", { name: /increase session/i });
        await act(async () => {
            fireEvent.click(incButton);
        });
        expect(screen.getByTestId("Session-length")).toHaveTextContent("26");
    });

    test("updates timer display when session length is changed", async () => {
        const incButton = screen.getByRole("button", { name: /increase session/i });
        await act(async () => {
            fireEvent.click(incButton);
        });
        expect(screen.getByText("26:00")).toBeInTheDocument();
    });

    test("reset button restores session and break lengths to default values", async () => {
        await act(async () => {
            fireEvent.click(screen.getByRole("button", { name: /increase session/i }));
        });
        await act(async () => {
            fireEvent.click(screen.getByRole("button", { name: /increase break/i }));
        });
        await act(async () => {
            fireEvent.click(screen.getByRole("button", { name: /reset/i }));
        });
        expect(screen.getByTestId("Session-length")).toHaveTextContent("25");
        expect(screen.getByTestId("Break-length")).toHaveTextContent("5");
    });

    test("displays leading zeros for single-digit session length", async () => {
        // Decrease session length to 9
        for (let i = 0; i < 16; i++) {
            await act(async () => {
                fireEvent.click(screen.getByRole("button", { name: /decrease session/i }));
            });
        }
        // Should display "09:00" not "9:00"
        expect(screen.getByText("09:00")).toBeInTheDocument();
    });
});

describe("Timer countdown and control functionality", () => {
    beforeAll(() => {
        vi.useFakeTimers();
    });

    beforeEach(() => {
        renderWithProviders(<Clock />);
    });

    afterAll(() => {
        vi.useRealTimers();
    });

    test("starts countdown when start button is clicked", async () => {
        const startButton = screen.getByRole("button", { name: /start/i });
        await act(async () => {
            fireEvent.click(startButton);
        });

        act(() => {
            vi.advanceTimersByTime(1000);
        });

        expect(screen.queryByText(/24:59/)).toBeInTheDocument();
    });

    test("resets timer to initial value when reset button is clicked during countdown", async () => {
        const startButton = screen.getByRole("button", { name: /start/i });
        await act(async () => {
            fireEvent.click(startButton);
        });

        act(() => {
            vi.advanceTimersByTime(5000);
        });

        const resetButton = screen.getByRole("button", { name: /reset/i });
        await act(async () => {
            fireEvent.click(resetButton);
        });

        expect(screen.getByText(/25:00/)).toBeInTheDocument();
    });

    test("pauses countdown when pause button is clicked", async () => {
        const startButton = screen.getByRole("button", { name: /start/i });
        await act(async () => {
            startButton.click();
        });
        act(() => {
            vi.advanceTimersByTime(2000);
        });
        await act(async () => {
            startButton.click();
        });
        act(() => {
            vi.advanceTimersByTime(2000);
        });
        // Should not decrement further after pause
        expect(screen.getByText(/24:58/)).toBeInTheDocument();
    });

    test("resumes countdown when resume button is clicked after pause", async () => {
        const startButton = screen.getByRole("button", { name: /start/i });
        await act(async () => {
            startButton.click();
        });
        act(() => {
            vi.advanceTimersByTime(1000);
        });
        await act(async () => {
            startButton.click();
        });
        await act(async () => {
            startButton.click();
        });
        act(() => {
            vi.advanceTimersByTime(1000);
        });
        expect(screen.getByText(/24:58/)).toBeInTheDocument();
    });

    test("switches to break timer and plays sound when session timer reaches zero", async () => {
        const playMock = vi.fn();
        Object.defineProperty(window.HTMLAudioElement.prototype, "play", {
            configurable: true,
            value: playMock,
        });

        await act(async () => {
            fireEvent.click(screen.getByRole("button", { name: /start/i }));
        });

        // Advance timers in 10 second increments, up to 30 minutes
        let found = false;
        for (let i = 0; i < 180; i++) {
            await act(async () => {
                vi.advanceTimersByTime(10000);
                await Promise.resolve();
            });

            if (screen.getByTestId("current-timer").textContent === "Break") {
                found = true;
                break;
            }
        }

        expect(found).toBe(true);
        expect(screen.getByTestId("current-timer")).toHaveTextContent("Break");
        expect(screen.getByText(/05:00/)).toBeInTheDocument();
        expect(playMock).toHaveBeenCalled();
    }, 20000);

    test("does not create duplicate timers when start button is clicked multiple times", async () => {
        const startButton = screen.getByRole("button", { name: /start/i });
        await act(async () => {
            fireEvent.click(startButton);
        });
        await act(async () => {
            fireEvent.click(startButton);
        });
        await act(async () => {
            fireEvent.click(startButton);
        });
        await act(() => {
            vi.advanceTimersByTime(1000);
        });
        // Only one second should pass, not multiple
        expect(screen.getByText(/24:59/)).toBeInTheDocument();
    });
});
