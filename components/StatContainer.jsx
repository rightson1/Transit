import CheckOutlined from "@mui/icons-material/CheckOutlined";
import Pending from "@mui/icons-material/Pending";
import PeopleTwoTone from "@mui/icons-material/PeopleTwoTone";
import ShoppingBagOutlined from "@mui/icons-material/ShoppingBagOutlined";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import KebabDiningIcon from '@mui/icons-material/KebabDining';
import { useGlobalProvider } from "../utils/themeContext";
import { useReal } from "../utils/realContext";
import { useAuth } from "../utils/authContext";
import { useItemQuery } from "../utils/hooks/useItems";
const StatContainer = () => {
    const { colors, mode } = useGlobalProvider()
    useEffect(() => {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {

                new Notification('Notification Title', {
                    body: 'Notification body text'
                });
            }
        });
    }, [])
    const Stat = ({ icon, bgcolor, title, sub }) => {
        return <Grid item xs={6} sm={6} md={3}
            sx={{
                p: 4,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                borderRight: {
                    sm: 'none',
                    md: `1px solid ${colors.primary[500]}`
                }
            }}
        >
            <Fab
                sx={{
                    bgcolor: bgcolor + '!important',
                    zIndex: '10 !important'
                }}
                size="medium"
                onClick={() => notification()}
            >

                {icon}

            </Fab>
            <Typography sx={{
                lineHeight: '30px',
                fontSize: {
                    xm: '18px',
                    sm: '19px',
                    md: '19px'

                },
                color: colors.grey[100],
                fontWeight: 500,


            }}>
                {title}
            </Typography>
            <Typography sx={{
                fontSize: '15px',
                color: colors.grey[100],
                fontWeight: 300

            }}>
                {sub}
            </Typography>

        </Grid>

    }
    return <Grid item xs={12} sm={12} md={8} sx={{
        pl: {
            md: 2
        }
    }}
    >
        <Grid container sx={{
            bgcolor: colors.primary[mode === "dark" ? 600 : 900] + "!important",
            borderRadius: '5px',


        }}>
            <Stat icon={<ShoppingBagOutlined
                sx={{
                    color: colors.teal[400]
                }}
            />}

                bgcolor={colors.teal[100]}
                title="Weeks Orders"
                // sub={orders?.length}
                sub={10}
            />
            <Stat icon={<CheckOutlined
                sx={{
                    color: colors.orange[400]
                }}
            />}

                bgcolor={colors.orange[100]}
                title="Rented"
                // sub={orders?.filter(order => order.status === "Delivered")?.length}
                sub={10}
            />
            <Stat icon={<Pending
                sx={{
                    color: colors.yellow[400]
                }}
            />}

                bgcolor={colors.yellow[100]}
                title="Pending"
                // sub={orders?.filter(order => order.status === "Pending").length}
                sub={6}
            />
            <Stat icon={<KebabDiningIcon
                sx={{
                    color: colors.teal[400]
                }}
            />}

                bgcolor={colors.teal[100]}
                title="Bikes"
                // sub={data?.length}
                sub={10}
            />

        </Grid>
    </Grid>;
};

export default StatContainer;
