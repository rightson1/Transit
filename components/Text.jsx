import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useGlobalProvider } from "../utils/themeContext";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
const Text = () => {
    const { colors, mode } = useGlobalProvider()
    return <Box
        sx={{
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            height: '100%',
        }}>

        <ListItem disablePadding>
            {/* <IconButton onClick={() => setOpen(true)}>
                <MenuOutlinedIcon sx={{
                    display: {
                        xs: 'block',
                        sm: 'block',
                        md: 'none',
                    }
                }}

                />
            </IconButton> */}
            <ListItemButton>
                <ListItemIcon>
                    <Avatar src="/img/avatar.png" />
                </ListItemIcon>
                <ListItemText primary="Rightson Tole" secondary="Online" />

            </ListItemButton>

        </ListItem>
        <Divider />

        <Box display="flex" flexDirection="column" py={2}
            sx={{ overflowY: 'scroll', height: '200px' }}
        >
            {
                [0, 0, 0].map((item, index) => (<>
                    <ListItem sx={{
                        alignSelf: "self-start",
                        maxWidth: '80%',
                    }}>
                        <ListItemIcon>
                            <Avatar src="/img/avatar.png" />
                        </ListItemIcon>
                        <Box
                            sx={{
                                padding: '.3rem',
                                background: colors.orange[200],
                                borderRadius: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'

                            }}>
                            <Typography
                            >
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            </Typography>
                            <img src="/img/logo.png" className="w-[100px] obje h-[100px]" />
                        </Box>

                    </ListItem>
                    <ListItem sx={{
                        alignSelf: "self-end",
                        maxWidth: '70%',
                        width: 'auto',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        background: colors.yellow[500],
                        borderRadius: '10px',

                    }}>

                        <Typography sx={{
                            textAlign: 'center'
                        }}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        </Typography>

                    </ListItem>
                </>))
            }
        </Box>
        <Box width="100%" display="flex" sx={{
            gap: '1rem',
            alignItems: 'center',

        }}>
            <Box display="flex" gap={1}>
                <ImageOutlinedIcon sx={{ fontSize: "2rem" }} />

            </Box>
            <Box sx={{
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <textarea className={`flex-grow-1 w-[100%]  resize-none rounded-md outline-none focus:border-[2px] focus:border-[rgba(255,255,0,.3)]`} style={{
                    backgroundColor: colors.primary[mode === 'dark' ? 500 : 800],
                    color: colors.grey[mode === 'dark' ? 500 : 800],
                    // backgroundColor: colors.primary[500],
                    // color: colors.grey[500],

                }} />
            </Box>
            <Box display="flex" gap={1}>

                <SendOutlinedIcon sx={{ fontSize: "2rem", transform: 'rotate(-45deg)' }} />
            </Box>


        </Box>
    </Box>
};

export default Text;
