import HomeIcon from "../icons/homeIcon";
import QuoteIcon from "../icons/quoteIcon";
import TimerIcon from "../icons/timerIcon";
import EqualsIcon from "../icons/EqualstorIcon";

export const MENU_ITEMS = [
    {
        id: "home",
        label: "Home",
        path: "/",
        Icon: HomeIcon,
    },
    {
        id: "quote",
        label: "Your Daily Quote",
        path: "/random-quote",
        Icon: QuoteIcon,
    },
    {
        id: "calculator",
        label: "Calculator",
        path: "/calculator",
        Icon: EqualsIcon,
    },
    {
        id: "clock",
        label: "25 + 5 Clock",
        path: "/clock",
        Icon: TimerIcon,
    },
];
