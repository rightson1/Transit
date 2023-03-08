import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";

import React from "react";
import { useGlobalProvider } from "../utils/themeContext";
import { useAuth } from "../utils/authContext";
import { useRouter } from "next/router";

const StatCard = () => {
    const { user } = useAuth()
    const router = useRouter()
    const { colors, mode } = useGlobalProvider()
    return <Grid item xs={12} sm={12} md={4}
        sx={{
            bgcolor: colors.primary[mode === "dark" ? 600 : 900] + "!important",
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',


        }}
    >
        <Box display='flex' flexDirection="column" gap={2}>
            <Typography sx={{
                lineHeight: '30px',
                fontSize: '19px',
                color: colors.grey[100],
                fontWeight: 500

            }}>
                Hey  {user?.name},<br />
                See Latest Orders
            </Typography>
            <Button
                onClick={() => router.push('/admin/orders')}
                sx={{
                    bgcolor: colors.teal[500] + '!important'
                }}>View</Button>
        </Box>
        <Box>
            <img src="/img/doll.svg" alt="" className="w-[120px]" />
        </Box>
    </Grid>;
};

export default StatCard;
