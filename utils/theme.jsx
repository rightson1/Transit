



export const tokens = (mode) => ({
    ...(mode === "dark"
        ? {
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
            },
            black: {
                100: "#d2d3d4",
                200: "#a6a7aa",
                300: "#797b7f",
                400: "#4d4f55",
                500: "#20232a",
                600: "#1a1c22",
                700: "#131519",
                800: "#0d0e11",
                900: "#060708"
            },

            teal: {
                100: "#cdf4f7",
                200: "#9ae9ef",
                300: "#68dfe7",
                400: "#35d4df",
                500: "#03c9d7",
                600: "#02a1ac",
                700: "#027981",
                800: "#015056",
                900: "#01282b"
            },
            orange: {
                100: "#feebe5",
                200: "#fdd7cc",
                300: "#fdc3b2",
                400: "#fcaf99",
                500: "#fb9b7f",
                600: "#c97c66",
                700: "#975d4c",
                800: "#643e33",
                900: "#321f19"
            },
            yellow: {
                100: "#fff4cf",
                200: "#ffe99f",
                300: "#fedf6f",
                400: "#fed43f",
                500: "#fec90f",
                600: "#cba10c",
                700: "#987909",
                800: "#665006",
                900: "#332803"
            },
            primary: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#1F2A40",
                500: "#141b2d",
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#040509",
            },
            greenAccent: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922",
            },
            redAccent: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f",
            },
            blueAccent: {
                100: "#e1e2fe",
                200: "#c3c6fd",
                300: "#a4a9fc",
                400: "#868dfb",
                500: "#6870fa",
                600: "#535ac8",
                700: "#3e4396",
                800: "#2a2d64",
                900: "#151632",
            },
        }
        : {
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0",
            },
            primary: {
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#f2f0f0", // manually changed
                500: "#141b2d",
                600: "#1F2A40",
                700: "#727681",
                800: "#a1a4ab",
                900: "#d0d1d5",
            },
            greenAccent: {
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee",
            },
            redAccent: {
                100: "#2c100f",
                200: "#58201e",
                300: "#832f2c",
                400: "#af3f3b",
                500: "#db4f4a",
                600: "#e2726e",
                700: "#e99592",
                800: "#f1b9b7",
                900: "#f8dcdb",
            },
            blueAccent: {
                100: "#151632",
                200: "#2a2d64",
                300: "#3e4396",
                400: "#535ac8",
                500: "#6870fa",
                600: "#868dfb",
                700: "#a4a9fc",
                800: "#c3c6fd",
                900: "#e1e2fe",
            },
            black: {
                900: "#d2d3d4",
                800: "#a6a7aa",
                700: "#797b7f",
                600: "#4d4f55",
                500: "#20232a",
                400: "#1a1c22",
                300: "#131519",
                200: "#0d0e11",
                100: "#060708"
            },
            teal: {
                100: "#cdf4f7",
                200: "#9ae9ef",
                300: "#68dfe7",
                400: "#35d4df",
                500: "#03c9d7",
                600: "#02a1ac",
                700: "#027981",
                800: "#015056",
                900: "#01282b"
            },
            orange: {
                100: "#feebe5",
                200: "#fdd7cc",
                300: "#fdc3b2",
                400: "#fcaf99",
                500: "#fb9b7f",
                600: "#c97c66",
                700: "#975d4c",
                800: "#643e33",
                900: "#321f19"
            },
            yellow: {
                100: "#fff4cf",
                200: "#ffe99f",
                300: "#fedf6f",
                400: "#fed43f",
                500: "#fec90f",
                600: "#cba10c",
                700: "#987909",
                800: "#665006",
                900: "#332803",
                1000: "#000000"
            },
        }),
});

// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        main: colors.primary[500],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: colors.black[900],
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        main: colors.primary[100],
                    },
                    secondary: {
                        main: colors.greenAccent[500],
                    },
                    neutral: {
                        dark: colors.grey[700],
                        main: colors.grey[500],
                        light: colors.grey[100],
                    },
                    background: {
                        default: "#fcfcfc",
                    },
                }),
        },


        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,

            h1: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Roboto", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

