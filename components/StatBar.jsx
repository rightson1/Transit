import { ResponsiveBar } from '@nivo/bar'
import { useGlobalProvider } from "../utils/themeContext";
import { Grid, Skeleton, Typography } from "@mui/material";
import Pie from "./Pie";
import { useAuth } from "../utils/authContext";
import { useGetOrderAgg } from "../utils/hooks/useOrder";
import { useState } from "react";

const StatBar = () => {

    const { colors, mode } = useGlobalProvider()
    const { business } = useAuth();
    const [rowId, setRowId] = useState()

    const week = Math.ceil((new Date()).getDate() / 7);
    const { data, isLoading } = useGetOrderAgg({ id: 1233, time: 'month', week })

    return (
        <Grid xs={12} sm={12} md={5.8}

            sx={{
                ml: {
                    xs: '0px',
                    xs: '0px',
                    md: '10px',

                },

                height: {
                    xs: '60vh',
                    sm: '70vh',
                    md: '70vh'
                },
                bgcolor: colors.primary[mode === "dark" ? 600 : 900] + "!important",
                borderRadius: '5px',
            }}
        >
            <Typography p={5} pb={0} variant="h3" color={colors.orange[500]} className="font-bold" >The Number of Sales In The Past One Week</Typography>
            {
                isLoading ? <Skeleton
                    sx={{
                        height: '100%',
                        minHeight: {
                            xs: '40vh',
                            sm: '40vh',
                        }
                    }}
                ></Skeleton> : data ? <Pie  {...{ orders: data, isDashboard: true }} /> :
                    <div style={{ color: colors.grey[100], textAlign: 'center', marginTop: '20px' }}>No data</div>

            }

        </Grid>

    )

}
export default StatBar
const data = [
    {
        "country": "",
        "hot dog": 22,
        "burger": 70,
        "sandwich": 39,
        "kebab": 187,
        "fries": 130,
        "donut": 144,

    },
    {
        "country": "AE",
        "hot dog": 170,
        "burger": 14,

        "sandwich": 100,
        "kebab": 45,

        "fries": 95,

        "donut": 82,

    },
    {
        "country": "AF",
        "hot dog": 45,

        "burger": 30,
        "sandwich": 75,

        "kebab": 36,

        "fries": 47,

        "donut": 135,
    },
    {
        "country": "AG",
        "hot dog": 137,

        "burger": 120,
        "sandwich": 178,
        "kebab": 42,

        "fries": 56,

        "donut": 97,
    },

]