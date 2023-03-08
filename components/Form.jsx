import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Title from "../components/Title";
import { useGlobalProvider } from "../utils/themeContext";
import TextField from '@mui/material/TextField';
import { FormControl } from "@mui/material";
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Delete from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuItem from '@mui/material/MenuItem';
import Close from "@mui/icons-material/Close";
import Collapse from '@mui/material/Collapse';
import { useCategoryQuery } from "../utils/hooks/useBusiness";
import { getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { storage } from "../utils/firebase";
import { useItemQuery, useSingleItemQuery, useUpdateItem } from "../utils/hooks/useItems";
import Info from "../components/Info";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useEffect } from "react";
import { useAuth } from "../utils/authContext";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
const Item = ({ item }) => {
    const [file, setFile] = useState(null)
    const router = useRouter();
    const id = router.query.id;


    const { data: categories } = useCategoryQuery()
    const [category, setCategory] = useState([])
    const [values, setValues] = useState(null)
    const { colors } = useGlobalProvider()
    const { mutate, isSuccess, isError } = useUpdateItem(id)
    const toastHandler = (type, message) => {
        toast.dismiss();
        toast[type](message)
    }
    useEffect(() => {
        if (isSuccess) {
            toastHandler('success', 'Item updated successfully')
        }
        else if (isError) {
            toastHandler('error', 'An error occured')
        }


    }, [isSuccess, isError])
    const handleSubmit = (e) => {
        e.preventDefault()

        if (!values) return;
        toastHandler('loading', 'Updating item...')

        if (!file) {
            mutate({ ...values, id })
            e.target.reset();
            return;

        }
        const fileRef = ref(storage, `/product/${file.name}`);
        uploadBytes(fileRef, file).then((res) => {
            setFile(null)
            getDownloadURL(res.ref).then((url) => {
                mutate({ ...values, image: url, id })
                e.target.reset();

            })
        }).catch((err) => {
            toastHandler('error', 'An error occured')

        });

    }
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return <Box>

        <Box sx={{ borderRadius: '5px', p: 2, }}>
            <Box p={1} component="form" sx={{ display: 'flex', flexDirection: "column", gap: '1rem' }} onSubmit={handleSubmit} >
                <FormControl sx={{
                    flexDirection: "column",
                    display: 'flex',
                    gap: 1,

                }}>
                    <Typography>Name</Typography>
                    <TextField label={item.name} name="name" onChange={handleChange} />
                </FormControl>
                <FormControl sx={{
                    flexDirection: "column",
                    display: 'flex',
                    gap: 1,

                }}>
                    <Typography>Number of Bicycles</Typography>
                    <TextField label={item.qty || 0} type="number" name="qty" onChange={handleChange} />
                </FormControl>

                <FormControl sx={{
                    flexDirection: "column",
                    display: 'flex',
                    gap: 1,

                }}>
                    <Typography>Category</Typography>
                    <Select
                        name="category"
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'Without label' }}


                    >
                        {categories &&
                            categories.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    value={item._id}
                                >
                                    {item.name}
                                </MenuItem>
                            ))}
                    </Select>
                    <FormHelperText>Select Item Category</FormHelperText>
                </FormControl>


                <FormControl sx={{
                    flexDirection: "column",
                    display: 'flex',
                    gap: 1,

                }}>
                    <Typography>Decription</Typography>
                    <Box
                        component="textarea"
                        onChange={handleChange}
                        name="desc"
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


                <FormControl fullWidth sx={{
                    flexDirection: "column",
                    display: 'flex',

                    gap: 1,

                }}>
                    <Typography alignSelf="start">Image</Typography>
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



                <Button type="submit"
                    sx={{
                        bgcolor: colors.orange[500] + "!important",
                        width: '70px',
                        alignSelf: 'flex-end'
                    }}
                >Update</Button>

            </Box>
        </Box>
    </Box>;
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default Item;
