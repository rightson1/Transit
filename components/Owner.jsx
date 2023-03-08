import React, { useEffect, useMemo, useState } from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from "next/router";
import { useGlobalProvider } from '../utils/themeContext';

import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import Delete from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FormControl from '@mui/material/FormControl';
import { useAdd, useEdit } from "../utils/hooks/useBusiness";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Info from "./Info"
import { useAuth } from "../utils/authContext";
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Close from '@mui/icons-material/Close';
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../utils/firebase";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
const Owners = () => {
    const { colors, owner } = useGlobalProvider();
    const [values, setValues] = useState(null);
    const { business } = useAuth();
    const [message, setMessage] = useState(false)
    const router = useRouter()
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    const [uploadError, setUploadError] = useState(null)
    const [file, setFile] = useState(null)
    const { mutate, isLoading, isError, isSuccess, error } = useEdit();
    const [img, setImg] = useState(null)
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    };
    const handleSubmit = (e) => {

        e.preventDefault()
        if (!values) {
            return
        }
        if (values.admin2 && values.admin2 === values.admin) {
            toast.error('Cannot change both admins at the same time')
            return
        }

        if (values.admin || values.admin2) {
            axios.get(`http://localhost:3000/api/business/exist?admin=${values.admin || values.admin2}`).then((res) => {
                if (res.data > 0) {
                    toast.error('User already has business')

                } else {
                    const data = { ...values, id: business?._id };
                    mutate(data)
                }
            })
        } else {
            const data = { ...values, id: business?._id };
            mutate(data)
        }

    }


    useEffect(() => {
        if (isLoading) {
            toast.loading('Updating Business')
        }
        if (isError) {
            localStorage.removeItem('business')
            toast.dismiss()
            toast.error('Something Went Wrong, Try Again or Contact Support')
            setLoading(false)

        }
        if (isSuccess) {
            setLoading(false)
            setMessage('Business Updated Successfully🥂🥂');
            toast.dismiss()
            toast.success('Business Updated Successfully🥂🥂')
        }

    }, [isError, isLoading, isSuccess])

    return <Box

        component="form"
        onSubmit={handleSubmit}
        sx={{
            display: 'flex',
            gap: 2,
            flexDirection: 'column',
        }}>
        <Typography
            variant="h3"
            sx={{
                alignSelf: 'flex-start',
                opacity: 0.8,
                fontWeight: 700,

            }}
        >Edit Owners</Typography>

        <Box
            className="flex flex-col gap-2 items-center "
        >
            <Typography
                sx={{
                    alignSelf: 'flex-start',
                }}

            >Owner 1 email</Typography>
            <Box
                component="input"

                placeholder={business?.admin}

                name="admin"
                type="email"
                onChange={handleChange}
                sx={{
                    width: "100%",
                    p: 2,
                    outline: colors.teal[100],
                    bgcolor: 'transparent',
                    border: `1px solid ${colors.black[400]}`,
                    '$:focus': {
                        outline: colors.teal[100],
                    }
                }}
                className="resize-none rounded-md p-4 focus:border-teal-500 focus:border-2  w-full"

            />
        </Box>
        <Box
            className="flex flex-col gap-2 items-center "
        >
            <Typography
                sx={{
                    alignSelf: 'flex-start',
                }}

            >Push Notify API Owner 1</Typography>
            <Typography className="text-[10px] self-start">Download Push Notify API-Notify Droid  app then type enter the key </Typography>
            <Box
                component="input"
                placeholder={business?.key}

                name="key"
                onChange={handleChange}
                sx={{
                    width: "100%",
                    p: 2,
                    outline: colors.teal[100],
                    bgcolor: 'transparent',
                    border: `1px solid ${colors.black[400]}`,
                    '$:focus': {
                        outline: colors.teal[100],
                    }
                }}
                className="resize-none rounded-md p-4 focus:border-teal-500 focus:border-2  w-full"

            />

        </Box>

        <Box
            className="flex flex-col gap-2 items-center "
        >
            <Typography
                sx={{
                    alignSelf: 'flex-start',
                }}

            >Owner 2 email</Typography>
            <Box
                component="input"
                placeholder={business?.admin2}

                name="admin2"
                type="email"
                onChange={handleChange}
                sx={{
                    width: "100%",
                    p: 2,
                    outline: colors.teal[100],
                    bgcolor: 'transparent',
                    border: `1px solid ${colors.black[400]}`,
                    '$:focus': {
                        outline: colors.teal[100],
                    }
                }}
                className="resize-none rounded-md p-4 focus:border-teal-500 focus:border-2  w-full"

            />
        </Box>
        <Box
            className="flex flex-col gap-2 items-center "
        >
            <Typography
                sx={{
                    alignSelf: 'flex-start',
                }}

            >Push Notify API Owner 2</Typography>
            <Typography className="text-[10px] self-start">Download Push Notify API-Notify Droid  app then type enter the key </Typography>
            <Box
                component="input"
                placeholder={business?.key2}

                name="key2"
                onChange={handleChange}
                sx={{
                    width: "100%",
                    p: 2,
                    outline: colors.teal[100],
                    bgcolor: 'transparent',
                    border: `1px solid ${colors.black[400]}`,
                    '$:focus': {
                        outline: colors.teal[100],
                    }
                }}
                className="resize-none rounded-md p-4 focus:border-teal-500 focus:border-2  w-full"

            />

        </Box>




        <Button
            sx={{
                bgcolor: colors.orange[500] + ' !important',
                width: "100%",

            }}
            type="submit"
        >Update</Button>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}

        >
            {loading ? <CircularProgress color="inherit" /> : error || uploadError ?
                <Typography sx={{ color: colors.redAccent[500] }}>Error Occured</Typography> : <Typography >Success</Typography>

            }
        </Backdrop>
        <Toaster />
    </Box>
}



export default Owners;
