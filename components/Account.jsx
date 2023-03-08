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
const Business = () => {
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
        const data = { ...values, id: business?._id };
        mutate(data)

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
        >Edit Business</Typography>

        <Box
            className="flex flex-col gap-2 items-center "
        >
            <Typography
                sx={{
                    alignSelf: 'flex-start',
                }}

            >Business Name</Typography>
            <Box
                component="input"
                placeholder={business?.name}

                name="name"
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
            >Business Description</Typography>
            <Box
                component="textarea"
                placeholder={business?.desc}

                name="desc"
                onChange={handleChange}
                sx={{
                    width: "100%",
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
            >Location Details</Typography>
            <Box
                component="textarea"
                placeholder={business?.location}

                name="location"
                onChange={handleChange}
                sx={{
                    width: "100%",
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
            >Opening Time</Typography>
            <Box
                component="input"

                type="time"
                name="opening"
                onChange={handleChange}
                placeholder={business?.opening}
                sx={{
                    width: "100%",
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
            >Closing Time</Typography>
            <Box
                component="input"

                type="time"
                name="closing"
                onChange={handleChange}
                sx={{
                    width: "100%",
                    outline: colors.teal[100],
                    bgcolor: 'transparent',
                    border: `1px solid ${colors.black[400]}`,
                    '$:focus': {
                        outline: colors.teal[100],
                    }
                }}
                className="resize-none rounded-md p-5 focus:border-teal-500 focus:border-2  w-full "

            />
        </Box>


        <Box
            className="flex flex-col gap-2 items-center "
        >
            <Typography
                sx={{
                    alignSelf: 'flex-start',
                }}
            >Password</Typography>
            <Box
                component="input"
                placeholder={business?.password}

                name="password"
                onChange={handleChange}
                sx={{
                    width: "100%",
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
        <FormControl
            className="flex flex-col gap-2 items-center "
        >
            <Typography
                sx={{
                    alignSelf: 'flex-start',
                }}
            >Phone  Number</Typography>
            <Box
                component="input"
                name="phone"
                onChange={handleChange}
                placeholder={business?.phone}
                sx={{
                    width: "100%",
                    outline: colors.teal[100],
                    bgcolor: 'transparent',
                    border: `1px solid ${colors.black[400]}`,
                    '$:focus': {
                        outline: colors.teal[100],
                    }
                }}
                className="resize-none rounded-md p-4 focus:border-teal-500 focus:border-2  w-full"

            />
        </FormControl>

        <FormControl
            className="flex flex-col gap-2 items-center "
        >
            <Typography
                sx={{
                    alignSelf: 'flex-start',
                }}
            >Delivery Details</Typography>
            <Box
                component="textarea"
                placeholder={business?.details}

                name="details"
                onChange={handleChange}
                sx={{
                    width: "100%",
                    outline: colors.teal[100],
                    bgcolor: 'transparent',
                    border: `1px solid ${colors.black[400]}`,
                    '$:focus': {
                        outline: colors.teal[100],
                    }
                }}
                className="resize-none rounded-md p-4 focus:border-teal-500 focus:border-2  w-full"

            />
            <FormHelperText className="self-start">Enter details about delivery,distance limit/fee etc</FormHelperText>
        </FormControl>

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



export default Business;
