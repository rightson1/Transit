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
import { useAdd } from "../utils/hooks/useBusiness";
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
const Business = () => {
    const { colors, owner } = useGlobalProvider();
    const { business, setBusiness } = useAuth()
    const [values, setValues] = useState(null);
    const [message, setMessage] = useState(false)
    const router = useRouter()
    const [open, setOpen] = useState(true);
    const [admins, setAdmins] = useState([])
    const [loading, setLoading] = useState(false)
    const [uploadError, setUploadError] = useState(null)
    const [file, setFile] = useState(null)

    const { mutate, isLoading, isError, isSuccess, error } = useAdd();
    const [pop, setPop] = useState(false)


    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    };
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        if (owner) {

            const fileRef = ref(storage, '/profile/' + file.name)
            uploadBytes(fileRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log('url', url)
                    const data = { ...values, admin: owner.email, avatar: url };
                    mutate(data)
                    setLoading(false)
                }
                ).catch((error) => {
                    console.log(error)
                    setLoading(false)
                    setUploadError(error.message)
                    setMessage("Error Uploading Image, Try Again")
                })
            })
        }
        else {
            setMessage('Please Register To Create A Business,If You already did, redo the process😪😯')
        }
    }

    useEffect(() => {
        if (isError) {
            toast.error('Do you already have another Business?Something Went Wrong, Try Again or Contact Support')

        }
        if (isSuccess) {
            toast.success('loading...')
            axios.get("/api/business/email/" + owner.email).then((res) => {
                console.log('business fetched')
                setBusiness(res.data)
                localStorage.setItem('business', JSON.stringify(res.data))
                router.push('/')
            }).catch((error) => {
                console.log(error)
                toast.error('Something whent wrong')
            })
        }
    }, [isError, isLoading, isSuccess])
    return <Box

        component="form"
        onSubmit={handleSubmit}
        sx={{
            display: 'flex',
            gap: 2,
            flexDirection: 'column',
            width: {
                xs: '80vw',
                sm: '70vw',
                md: '400px'
            },
        }}>
        <Typography
            variant="h3"
            sx={{
                alignSelf: 'flex-start',
                opacity: 0.8,
                fontWeight: 700,

            }}
        >Register Business</Typography>
        <Typography
            variant="body2"
            sx={{
                color: colors.primary[200],
            }}
            onClick={() => router.push('/login')}
        >Already have A Business ? <Typography component="button"
            color={colors.teal[500]}
        >Link To Business</Typography></Typography>
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

                name="name"
                required
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
                required
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
        <FormControl
            className="flex flex-col gap-2 items-center "
        >
            <Typography
                sx={{
                    alignSelf: 'flex-start',
                }}
            >Location Details</Typography>
            <Box
                component="textarea"
                required
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
        </FormControl>

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
                required
                type="time"
                name="opening"
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
            >Closing Time</Typography>
            <Box
                component="input"
                required
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
                required
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
                required
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
        <FormControl sx={{
            flexDirection: "column",
            display: 'flex',
            gap: 1,

        }}>
            <Typography>Free Delivery?</Typography>
            <Select
                name="delivery"
                required
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
        <FormControl sx={{
            flexDirection: "column",
            display: 'flex',
            gap: 1,

        }}>
            <Typography>Business Type</Typography>
            <Select
                name="type"
                required
                onChange={handleChange}
                inputProps={{ 'aria-label': 'Without label' }}

            >
                <MenuItem
                    value={"foods"}
                >
                    Foods
                </MenuItem>
                <MenuItem
                    value={"gas"}
                >
                    Gas
                </MenuItem>

            </Select>
            <FormHelperText>Either gas supplier or</FormHelperText>
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
                required
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
        <FormControl fullWidth sx={{
            flexDirection: "column",
            display: 'flex',

            gap: 1,

        }}>
            <Typography alignSelf="start">Image</Typography>
            <TextField type="file" fullWidth
                required
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
        {loading || isLoading ? <Button> <CircularProgress color="inherit" /> </Button> : <Button
            sx={{
                bgcolor: colors.orange[500] + ' !important',
                width: "100%",

            }}
            type="submit"
        >Register</Button>}
        <Typography>You can still change this information later in admin-settings-edit tab</Typography>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading || loading}

        >
            {loading || isLoading ? <CircularProgress color="inherit" /> : error || uploadError ?
                <Typography sx={{ color: colors.redAccent[500] }}>Error Occured</Typography> : <Typography >Success</Typography>

            }
        </Backdrop>
        <Toaster />
    </Box>
}



export default Business;
