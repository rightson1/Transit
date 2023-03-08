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
        if (!values) return;

        if (file) {
            toast.loading('Updating Business')
            setLoading(true)
            // const deleteRef = ref(storage, business.avatar);

            // deleteObject(deleteRef).then(() => {

            const fileRef = ref(storage, '/profile/' + file.name)
            uploadBytes(fileRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url)
                    toast.dismiss()
                    const data = { ...values, avatar: url, id: business?._id };
                    mutate(data)

                }
                ).catch((error) => {
                    toast.dismiss()
                    toast.error(error.message)
                    setUploadError(error.message)
                    setMessage("Error Uploading Image, Try Again")
                })
            })
            // .catch((error) => {
            //     console.log(error)
            //     toast.dismiss()
            //     setLoading(false)
            //     setUploadError(error.message)
            //     setMessage("Error Uploading Image, Try Again")
            // }
            // )
            // })
        }
        if (img) {
            setLoading(true)
            const deleteRef = ref(storage, business.avatar);

            // deleteObject(deleteRef).then(() => {
            const fileRef = ref(storage, '/profile/' + img.name)
            uploadBytes(fileRef, img).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    const data = { ...values, locationImg: url, id: business?._id };
                    mutate(data)

                }
                ).catch((error) => {

                    setUploadError(error.message)
                    setMessage("Error Uploading Image, Try Again")
                })
                //     }).catch((error) => {
                //         setLoading(false)
                //         setUploadError(error.message)
                //         setMessage("Error Uploading Image, Try Again")
                //     }
                //     )
            })
        }
        else {
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
        >Edit Business</Typography>


        {/* <Box
            className="flex flex-col gap-2 items-center "
        >
            <Typography
                sx={{
                    alignSelf: 'flex-start',
                }}

            >Push Notify API 2</Typography>
            <Typography className="text-[10px] self-start">This will act as a back up</Typography>
            <Box
                component="input"
                placeholder={business?.key}

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

        </Box> */}
        <FormControl sx={{
            flexDirection: "column",
            display: 'flex',
            gap: 1,

        }}>
            <Typography>Free Delivery?</Typography>
            <Select
                name="delivery"

                onChange={handleChange}
                inputProps={{ 'aria-label': 'Without label' }}

            >
                <MenuItem
                    value={true}
                >
                    Yes
                </MenuItem>
                <MenuItem
                    value={false}
                >
                    No
                </MenuItem>

            </Select>
            <FormHelperText>Do You Offer Free Delivery</FormHelperText>
        </FormControl>

        <FormControl fullWidth sx={{
            flexDirection: "column",
            display: 'flex',

            gap: 1,

        }}>
            <Typography alignSelf="start">Profile Picture</Typography>
            <TextField type="file" fullWidth

                file={file}
                onChange={(e) => setFile(e.target.files[0])}
            />
            {file &&
                <Box className="w-full h-[100px] flex flex-col justify-center items-center">

                    <IconButton onClick={() => setFile(null)}>
                        <Close />
                    </IconButton>
                    <img src={URL.createObjectURL(file)} className="w-[100px] obje h-[100px]" />
                </Box>}
        </FormControl>
        <FormControl fullWidth sx={{
            flexDirection: "column",
            display: 'flex',

            gap: 1,

        }}>
            <Typography alignSelf="start">Location Image</Typography>
            <TextField type="file" fullWidth

                file={img}
                onChange={(e) => setImg(e.target.files[0])}
            />
            {img &&
                <Box className="w-full h-[100px] flex flex-col justify-center items-center">

                    <IconButton onClick={() => setImg(null)}>
                        <Close />
                    </IconButton>
                    <img src={URL.createObjectURL(img)} className="w-[100px] obje h-[100px]" />
                </Box>}
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
