import { Button, List, ListItem, ListItemAvatar, Avatar, Typography, ListItemText, Divider, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useReal } from "../utils/realContext";
import { useGlobalProvider } from "../utils/themeContext";
import { db } from "../utils/firebase";
import { setDoc, doc, updateDoc } from '@firebase/firestore';
import { Toaster, toast } from "react-hot-toast";
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
const NotificationList = () => {
    const { notifications, setNotifications } = useReal()

    const { colors } = useGlobalProvider();
    const handleRead = (item) => {
        if (item.deleted) {
            setNotifications(notifications.filter((i) => i.id !== item.id))

        } else {
            const updateRef = doc(db, "orders", item.id);
            const update = updateDoc(updateRef, {
                read: "true"
            }
            )
            toast.promise(
                update,
                {
                    loading: 'Editing...',
                    success: <b>Marked As Read...</b>,
                    error: <b>Error😢😢.</b>,
                }
            );

        }

    }

    return <List>
        <Box className="flex gap-6 mb-4">
            <Typography variant="h4">
                Notifications
            </Typography>
            <Button sx={{ bgcolor: colors.yellow[500] + '!important' }} size="small">
                {notifications?.length} New
            </Button>
        </Box>
        {
            notifications?.map((item, index) => {
                console.log(item)
                return <>
                    <ListItem disablePadding key={index}>

                        <ListItemText primary={item.userName} secondary={item.message} />
                        <IconButton onClick={() => handleRead(item)} sx={{ bgcolor: colors.redAccent[300] + "!important", padding: ".2 0" + '!important', fontSize: '.6rem' }}>
                            <DoneOutlinedIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                    </ListItem>
                    <Divider />
                </>
            })
        }
        <Toaster />
    </List>
};

export default NotificationList;
