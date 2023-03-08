import { Grid, Box, Paper, Typography, Button, Divider, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGlobalProvider } from "../utils/themeContext";
import GoogleIcon from '@mui/icons-material/Google';
import { useRouter } from "next/router";
import RegisterStepper from "../components/RegsterStepper";
const Start = () => {
    const [values, setValues] = useState(null);
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState({
        opened: false,
        error: null,
    })

    const { colors } = useGlobalProvider();
    const handleChange = (e) => {

        setValues({ ...values, [e.target.name]: e.target.value })

    }
    return <Grid container
        sx={{
            zIndex: 5,
        }}
    >
        <Grid item
            xs={12}
            md={6}
            sx={{
                position: 'relative',
                backgroundImage: 'url(/register.svg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                backgroundPosition: 'right bottom',
                width: "100%",
                p: 2,
                height: {
                    xs: "60vh",
                    md: "100vh"
                },
            }}
        >

            <Typography
                variant="h2" fontFamily="Atomic Age" color={colors.orange[500]}
            >H-Foods</Typography>
        </Grid>
        <Grid item
            xs={12}
            component={Paper}
            md={6}
            sx={{
                width: "100%",
                gap: 1,
                p: 2,
                bgcolor: colors.primary[600],
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',

            }}
        >

            <RegisterStepper />

        </Grid>
    </Grid>;
};
Start.noLayout = true;
export default Start;
