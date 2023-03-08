
import {
    createContext,
    useState,
    useMemo,
    useReducer,
    useContext,
    useEffect,
} from "react";
import { reducer, actionTypes } from "./reducer";
import { tokens, themeSettings } from "./theme";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider as Theme } from "@mui/material/styles";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { AuthProvider } from "./authContext";
import { RealProvider } from "./realContext";
const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
    const router = useRouter()

    const initialState = useMemo(() => {
        return {
            theme: 'dark'
        }
    }, [])
    const [state, dispatch] = useReducer(reducer, initialState);
    const mode = useMemo(() => {
        return state.theme
    }, [state])
    const colors = tokens(mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const [open, setOpen] = useState(false);
    const [close, setClose] = useState(false);
    const isMobile = useMediaQuery("(max-width: 900px)")
    const isMobileSmall = useMediaQuery("(max-width: 600px)")
    const isLarge = useMediaQuery("(min-width: 900px)");
    const [change, setChange] = useState(false)
    const [owner, setOwner] = useState(null)
    const [queryClient] = useState(() => new QueryClient());
    useEffect(() => {
        if (localStorage.getItem('owner')) {
            setOwner(JSON.parse(localStorage.getItem('owner')))
        }
    }, [])

    useEffect(() => {
        if (isLarge) {
            setOpen(true)
        } else {
            setOpen(false)

        }
    }, [isLarge, isMobile])
    useEffect(() => {
        if (!isLarge) {
            setOpen(false)
            return;
        } else if (isLarge) {
            setOpen(true)

        }

    }, [router.pathname])



    return (
        <ThemeContext.Provider
            value={{
                ...state,
                owner,
                setOwner,
                dispatch,
                actionTypes,
                colors,
                mode,
                open,
                setOpen,
                isMobile,
                change,
                close,
                isLarge,
                setChange,
                setClose,
                isMobileSmall


            }}
        >

            <QueryClientProvider client={queryClient}>
                <Theme theme={theme}>

                    <AuthProvider>


                        <CssBaseline />
                        <RealProvider>
                            {children}
                        </RealProvider>

                        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
                    </AuthProvider>
                </Theme>
            </QueryClientProvider>
        </ThemeContext.Provider>
    );
};
export const useGlobalProvider = () => useContext(ThemeContext);
