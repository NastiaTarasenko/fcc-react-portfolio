export const OPERATIONS = ["-", "+", "x", "/"];

export const LIGHT_THEME = "light";
export const DARK_THEME = "dark";

export const PAW_PATH =
    "M180-475q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180-160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm240 0q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29Zm180 160q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM266-75q-45 0-75.5-34.5T160-191q0-52 35.5-91t70.5-77q29-31 50-67.5t50-68.5q22-26 51-43t63-17q34 0 63 16t51 42q28 32 49.5 69t50.5 69q35 38 70.5 77t35.5 91q0 47-30.5 81.5T694-75q-54 0-107-9t-107-9q-54 0-107 9t-107 9Z";
export const STAR_PATH = "m320-240 160-122 160 122-60-198 160-114H544l-64-208-64 208H220l160 114-60 198Z";
export const SUN_PATH =
    "M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z";
export const MOON_PATH =
    "M600-640 480-760l120-120 120 120-120 120Zm200 120-80-80 80-80 80 80-80 80ZM483-80q-84 0-157.5-32t-128-86.5Q143-253 111-326.5T79-484q0-146 93-257.5T409-880q-18 99 11 193.5T520-521q71 71 165.5 100T879-410q-26 144-138 237T483-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T463-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T159-484q0 135 94.5 229.5T483-160Zm-20-305Z";

const BG_ICONS_STYLES_ORDERED = [
    { top: "5%", left: "10%", rotate: "15deg" },
    { top: "15%", left: "25%", rotate: "-20deg" },
    { top: "25%", left: "5%", rotate: "5deg" },
    { top: "30%", left: "20%", rotate: "-10deg" },
    { top: "40%", left: "10%", rotate: "25deg" },
    { top: "50%", left: "22%", rotate: "-15deg" },
    { top: "51%", left: "5%", rotate: "-15deg" },
    { top: "60%", left: "15%", rotate: "10deg" },
    { top: "70%", left: "7%", rotate: "-5deg" },
    { top: "80%", left: "18%", rotate: "20deg" },
    { top: "90%", left: "12%", rotate: "-25deg" },

    { top: "5%", left: "35%", rotate: "10deg" },
    { top: "4%", right: "35%", rotate: "10deg" },
    { top: "12%", left: "50%", rotate: "-15deg" },
    { top: "18%", left: "40%", rotate: "20deg" },
    { top: "40%", left: "32%", rotate: "-20deg" },
    { top: "39%", right: "30%", rotate: "15deg" },
    { top: "67%", left: "27%", rotate: "-5deg" },
    { top: "70%", right: "26%", rotate: "25deg" },
    { top: "80%", left: "46%", rotate: "-15deg" },
    { top: "87%", left: "33%", rotate: "20deg" },
    { top: "87%", right: "29%", rotate: "-29deg" },
    { top: "92%", right: "42%", rotate: "17deg" },

    { top: "5%", right: "10%", rotate: "-15deg" },
    { top: "15%", right: "25%", rotate: "20deg" },
    { top: "25%", right: "5%", rotate: "-5deg" },
    { top: "30%", right: "20%", rotate: "10deg" },
    { top: "40%", right: "10%", rotate: "-25deg" },
    { top: "50%", right: "22%", rotate: "15deg" },
    { top: "53%", right: "5%", rotate: "15deg" },
    { top: "60%", right: "15%", rotate: "-10deg" },
    { top: "70%", right: "7%", rotate: "5deg" },
    { top: "80%", right: "18%", rotate: "-26deg" },
    { top: "90%", right: "12%", rotate: "25deg" },
];

export const BG_ICONS_STYLES = [...BG_ICONS_STYLES_ORDERED].sort(() => Math.random() - 0.5);
