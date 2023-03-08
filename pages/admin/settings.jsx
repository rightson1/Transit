import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListItemIcon from "@mui/material/ListItemIcon";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Title from "../../components/Title";
import { useGlobalProvider } from "../../utils/themeContext";
import Stabs from "../../components/Stabs"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { useAuth } from "../../utils/authContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Switch from '@mui/material/Switch';
import { useEffect } from "react";
import { useBusinessQuery } from "../../utils/hooks/useBusiness";

const Category = () => {
    const { colors, mode, bottomBar, setBottomBar } = useGlobalProvider()
    const { data: business } = useBusinessQuery();
    console.log(business)
    const [open, setOpen] = useState(false);



    useEffect(() => {
        localStorage.setItem("bottomBar", bottomBar)

    }, [bottomBar])
    return <Box>
        <Title title="Settings" subtitle="Business Settings" />
        {business && <Box sx={{
            margin: "20px !important",
            overflow: 'hidden',
            p: '1rem',
            bgcolor: colors.primary[mode == "dark" ? 800 : 400],

        }}>
            <Grid container spacing={0} sx={{ height: '100%' }} gap={2}>
                <Grid item sx={{

                    height: '100%',
                    overflow: "hidden",
                    padding: '1rem !important',
                    display: 'flex',
                    flexDirection: 'column',


                }}
                    md={4}
                    xs={12}
                    sm={12}

                >
                    <img src={business.avatar} className="max-h-full object-cover" />
                </Grid>
                <Grid item
                    xs={12} sm={12} md={7}

                    sx={{

                        display: 'flex',
                        flexDirection: 'column',
                        gap: "15px"
                    }}
                >
                    <Box justifyContent="flex-start" className="flex items-center justify-between">
                        <Button sx={{ color: colors.primary[500], background: colors.teal[500] + '!important' }} >{business.open ? 'Open' : 'Closed'}</Button>
                        <Typography className="text-xl" color={colors.orange[600]}>{business.phone}</Typography>
                    </Box>
                    <Box justifyContent="flex-start" className="flex items-center justify-between">
                        <Switch inputProps={{ 'aria-label': 'controlled' }} checked={bottomBar}
                            onChange={(e) => setBottomBar(e.target.checked)} />
                        <Typography className="text-xl" color={colors.primary[400]}>Bottom Bar</Typography>
                    </Box>
                    <Typography variant="h3" fontWeight="bold">{business.name}</Typography>
                    <Box className="flex flex-col gap-2">
                        <Typography
                            sx={{
                                fontSize: '16px',
                                letterSpacing: '2px'
                            }}
                        ><Typography sx={{ color: colors.orange[600] }} component="span">Delivery:</Typography>{business.delivery ? 'We Offer Free Delivery' : 'No Free Delivery Offered'}</Typography>
                        <Typography
                            sx={{
                                fontSize: '16px',
                                letterSpacing: '2px'
                            }}
                        >{business.desc}</Typography>
                    </Box>

                    <Box className="flex flex-col gap-2">
                        <Typography className="font-bold text-xl">Open Hours</Typography>
                        <div className="flex justify-between ">
                            <Typography className="flex gap-2"><Typography sx={{ color: colors.orange[500] }}>Open:</Typography>
                                {business.opening}</Typography>

                            <Typography className="flex gap-2"><Typography sx={{ color: colors.orange[500] }}>Closing:</Typography>
                                {business.closing}</Typography>

                        </div>
                    </Box>
                    <Typography
                        sx={{
                            fontSize: '16px',
                            letterSpacing: '2px'
                        }}
                    >{business.deliveryDetails}</Typography>

                    <Box
                        display="flex"
                        alignContent="center"
                        gap={2}

                    >
                        {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                        <Typography
                            sx={{
                                fontSize: '16px',
                                letterSpacing: '2px',
                                textDecoration: 'underline'
                            }}
                        >  254reviews</Typography> */}

                    </Box>
                </Grid>

            </Grid>


        </Box>}
        {/* <Paper
            elevation={10} sx={{
                margin: "20px !important",
                overflow: 'hidden',
                p: '1rem',
                rounded: '10px',
            }}
        >

            <Stabs />

        </Paper> */}


    </Box>;
};

export default Category;
