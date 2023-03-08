import React, { useRef, useState } from "react";
import { styled, useTheme } from '@mui/material/styles';
import { useGlobalProvider } from "../utils/themeContext";
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useRouter } from "next/router";
import DetailsOutlined from "@mui/icons-material/DetailsOutlined";
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import Collapse from '@mui/material/Collapse';
import MonthIcon from '@mui/icons-material/CalendarMonth';
import { useAuth } from "../utils/authContext";
const drawerWidth = 200;





const AdminSide = () => {
    const { colors, mode, dispatch, actionTypes, open, setOpen, isMobile, isLarge } = useGlobalProvider();
    const theme = useTheme();
    const [selected, setSelected] = React.useState()
    const [active, setActive] = React.useState(false);
    const close = useRef()
    const router = useRouter()
    const { business } = useAuth()
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const openedMixin = (theme) => ({
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
    });

    const closedMixin = (theme) => ({
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: isLarge ? `calc(${theme.spacing(7)} + 1px)` : 0,
        [theme.breakpoints.up('md')]: {
            width: isLarge ? `calc(${theme.spacing(8)} + 10px)` : '0',
        },
    });



    const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
            ...(open && {
                ...openedMixin(theme),
                '& .MuiDrawer-paper': openedMixin(theme),
            }),
            ...(!open && {
                ...closedMixin(theme),
                '& .MuiDrawer-paper': closedMixin(theme),
            }),
        }),
    );

    const ListComponent = ({ items }) => {
        const [close, setClose] = useState(null)

        return <Box width={190} sx={{

        }}>

            {open && (<>  <Box display="flex" justifyContent="space-between" alignItems="center" p="1rem">

                <Typography  >
                    ADMINS
                </Typography>
                <IconButton onClick={handleDrawerClose} >
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </Box>
            </>)
            }


            <List>
                {items.map(({ text, icon, link, more, plink }, index) => {
                    if (!icon) {
                        return (<ListItem disablePadding sx={{ display: 'block' }} key={index}>
                            <ListItemButton

                                sx={{
                                    minHeight: 48,
                                    justifyContent: 'center',
                                    px: 2.5,

                                }}
                            >

                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography key={text} fontWeight="bold" color={colors.black[300]}>
                                        {text}
                                    </Typography>
                                    {/* {text} */}
                                </ListItemIcon>

                            </ListItemButton>
                        </ListItem>)

                    }
                    else if (more) {
                        const lcText = text.toLowerCase();

                        return (<ListItem disablePadding sx={{
                            display: 'block',


                        }}

                            key={index}>
                            <ListItemButton
                                onClick={() => setClose(prev => prev === plink ? null : plink)}


                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    color: colors.black[100],
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        color: colors.black[300],

                                    },
                                    "&:hover .MuiListItemIcon-root": {
                                        color: colors.black[300],
                                    },
                                    '&:hover': {
                                        bgcolor: colors.teal[300],

                                    }

                                }}
                            >
                                <Tooltip title={text}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            // color: colors.black[100],
                                            // '&:hover': {
                                            //     color: colors.black[800],

                                            // }


                                        }}
                                    >

                                        {icon}
                                    </ListItemIcon>
                                </Tooltip>
                                <ListItemText primary={text} sx={{
                                    opacity: open ? 1 : 0,

                                }} />

                                <KeyboardArrowDownIcon />

                            </ListItemButton>
                            <Collapse in={close == plink ? true : false} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {more.map(({ text, icon, link }, index) => (<ListItemButton
                                        onClick={() => router.push(`/admin/${plink}/${link}`)}
                                        sx={{ pl: 4 }} key={index}>
                                        <ListItemIcon>
                                            {icon}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>))}
                                </List>
                            </Collapse>



                        </ListItem>
                        );

                    }
                    else {

                        const lcText = text.toLowerCase();

                        return (<ListItem disablePadding sx={{
                            display: 'block',
                            '&:hover': {
                                bgcolor: colors.teal[300],

                            },
                            bgcolor: router.pathname?.split('/')[2] == link ? colors.teal[300] : undefined

                        }} onClick={() => {
                            router.push(link == "/" ? '/' : `/admin/${link}`)


                        }} key={index}>
                            <ListItemButton

                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    color: router.pathname?.split('/')[2] == link ? colors.black[300] : colors.black[100],
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        color: colors.black[300],

                                    },
                                    "&:hover .MuiListItemIcon-root": {
                                        color: colors.black[300],
                                    }

                                }}
                            >
                                <Tooltip title={text}>
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            // color: colors.black[100],
                                            // '&:hover': {
                                            //     color: colors.black[800],

                                            // }


                                        }}
                                    >

                                        {icon}
                                    </ListItemIcon>
                                </Tooltip>
                                <ListItemText primary={text} sx={{
                                    opacity: open ? 1 : 0,
                                    // color: colors.black[100],
                                    // fontWeight: 'bold',
                                    // '&:hover': {
                                    //     color: colors.black[800],

                                    // }
                                }} />
                            </ListItemButton>
                        </ListItem>
                        );
                    }
                })}
            </List>


        </Box>

    }
    if (isMobile) {
        return <>
            <MuiDrawer
                open={open}
                anchor="left"
                onClose={() => setOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        background: mode == 'dark' ? colors.primary[800] : '#fcfcfc'

                    },
                    flexGrow: 1,

                }}
            >
                <Box
                    width={200}
                >
                    <ListComponent items={navItems} />
                </Box>
            </MuiDrawer>
        </>;
    } else {
        return <Box sx={{
            display: "flex",
            flexGrow: 1,
            height: 'auto',

        }}
        >


            <Drawer
                variant="permanent" open={open}

                sx={{
                    '& .MuiDrawer-paper': {
                        background: mode == 'dark' ? colors.primary[800] : '#fcfcfc'

                    },

                    height: 'auto'

                }}>


                <ListComponent items={navItems} />

            </Drawer>

        </Box>;
    }
};


const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlinedIcon />,
        link: '/',

    },

    {
        text: "Apps",
    },

    {
        text: "Orders",
        link: 'orders',
        icon: <ShoppingCartOutlinedIcon />,
    },
    {
        text: "Forms",

    },
    {
        text: "New Category",
        link: "new-category",
        icon: <AddShoppingCartOutlinedIcon />,
    },

    {
        text: "New Item",
        link: "new-item",
        icon: <AddCircleOutlineIcon />,
    },
    {
        text: "Data",
    },
    {
        text: "Categories",
        link: 'categories',
        icon: <CategoryOutlinedIcon />
    },

    {
        text: 'Products',
        plink: 'products',
        // icon:<AttachMoneyIcon />
        icon: <FastfoodOutlinedIcon />,
        more: [
            {
                text: "Grid",
                link: 'details',
                icon: <DetailsOutlined />
            },
            // {
            //     text: "Cards",
            //     link: 'list',
            //     icon: <ListAltOutlinedIcon />
            // },

        ]



    },

    {
        text: "Pages",
    },

    ,
    {
        text: "Settings",
        link: 'settings',
        icon: <SettingsOutlinedIcon />

    },


    {
        text: 'Sales',


    },
    {
        text: 'Finances',
        plink: 'finances',
        icon: <PaidOutlinedIcon />,
        more: [

            {
                text: "Weekly",
                link: 'this-week',
                icon: <MonthIcon />
            },
            {
                text: "Monthly",
                link: 'this-month',
                icon: <MonthIcon />
            }
        ]

    },

    {
        text: 'Pie Chart',


    },
    {
        text: 'Items Sold',
        link: '/',
        icon: <PieChartOutlineOutlinedIcon />


    }, {
        text: 'Revenue',
        link: '/',
        icon: <BarChartOutlinedIcon />

    }

];







export default AdminSide;
