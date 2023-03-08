import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
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
import React, { useState } from "react";
import Title from "../../components/Title";
import { useGlobalProvider } from "../../utils/themeContext";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Drawer from '@mui/material/Drawer';

const Chat = () => {
    const { colors, mode } = useGlobalProvider()
    const [open, setOpen] = useState(false)
    return <Box sx={{
        p: {
            xs: '10px 10px',
            sm: '10px 10px',
            md: '25px',
        }
    }}>
        {/* <Title title="Messanger" subtitle="Chat App" /> */}
        <Paper sx={{ my: '0px', borderRadius: { xs: '0', sm: '5px', md: '10px' }, background: 'transparent', overflow: 'hidden' }} elevation={10}>

            <Drawer
                anchor="left"
                open={open}
                onClose={() => setOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        p: '1rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '.3rem',
                        background: colors.primary[400],
                    },

                }}
            >
                <Box>   <TextField label="Search Contact" fullWidth /></Box>
                <List sx={{ overflowY: 'scroll', height: 'auto' }}>
                    {
                        [1, 2, 3, 4, 5, 6, 1, 2, 2, 3].map((item, index) => (<ListItem key={index} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar src="/img/avatar.png" />
                                </ListItemIcon>
                                <ListItemText primary="Rightson Tole" secondary="chari.rightson@gmail.com" />

                            </ListItemButton>

                        </ListItem>))
                    }

                </List>

            </Drawer>

            <Grid container spacing={0} sx={{ height: '100%' }}>
                <Grid item sx={{
                    display: {
                        xs: 'none',
                        sm: 'none',
                        md: 'block',
                    },
                    bgcolor: colors.primary[mode === 'dark' ? 300 : 800],
                    // bgcolor: colors.primary[300],
                    height: '100%',

                    padding: '1rem !important',
                    height: "85vh"

                }}
                    md={4}

                >
                    <Box
                        sx={{
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            height: '100%',
                        }}
                    >
                        <Box>   <TextField label="Search Contact" fullWidth /></Box>

                        <List sx={{ overflowY: 'scroll', py: '1rem', height: 'auto' }}>
                            {
                                [1, 2, 3, 4, 5, 6, 1, 2, 2, 3].map((item, index) => (<ListItem key={index} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Avatar src="/img/avatar.png" />
                                        </ListItemIcon>
                                        <ListItemText primary="Rightson Tole" secondary="chari.rightson@gmail.com" />

                                    </ListItemButton>

                                </ListItem>
                                ))
                            }

                        </List>



                    </Box>
                </Grid>
                <Grid item
                    xs={12} sm={12} md={8}

                    sx={{
                        background: colors.primary[mode === 'dark' ? 800 : 900],
                        // background: colors.primary[600],
                        height: "85vh"
                    }}
                >

                    <Box
                        sx={{
                            padding: '1rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            height: '100%',
                        }}>

                        <ListItem disablePadding>
                            <IconButton onClick={() => setOpen(true)}>
                                <MenuOutlinedIcon sx={{
                                    display: {
                                        xs: 'block',
                                        sm: 'block',
                                        md: 'none',
                                    }
                                }}

                                />
                            </IconButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Avatar src="/img/avatar.png" />
                                </ListItemIcon>
                                <ListItemText primary="Rightson Tole" secondary="Online" />

                            </ListItemButton>

                        </ListItem>
                        <Divider />

                        <Box display="flex" flexDirection="column" py={2}
                            sx={{ overflowY: 'auto', height: 'auto' }}
                        >
                            {
                                [0, 0, 0].map((item, index) => (<>
                                    <ListItem sx={{
                                        alignSelf: "self-start",
                                        maxWidth: '80%',
                                    }}>

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
                                        maxWidth: '80%',
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
                                    backgroundColor: colors.primary[mode === 'dark' ? 600 : 800],
                                    color: colors.grey[mode === 'dark' ? 500 : 800],
                                    // backgroundColor: colors.primary[500],
                                    // color: colors.grey[500],

                                }} />
                            </Box>
                            <Box display="flex" gap={1}>

                            </Box>


                        </Box>
                    </Box>
                </Grid>

            </Grid>

        </Paper>
    </Box>
};

export default Chat;
