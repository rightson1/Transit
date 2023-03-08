import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";

import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import Title from "../../components/Title";
import { useGlobalProvider } from "../../utils/themeContext";
import TextField from '@mui/material/TextField';
import { FormControl } from "@mui/material";
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Delete from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuItem from '@mui/material/MenuItem';
import Close from "@mui/icons-material/Close";
import Collapse from '@mui/material/Collapse';
import { useCategoryQuery } from "../../utils/hooks/useBusiness";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../utils/firebase";
import { useItemQuery, useNewItem } from "../../utils/hooks/useItems";
import Info from "../../components/Info";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { useEffect } from "react";
import { useAuth } from "../../utils/authContext";
import { useMemo } from "react";
const Item = () => {
    const [file, setFile] = useState(null)
    const { colors, mode } = useGlobalProvider()
    const { business } = useAuth();
    const { data: categories } = useCategoryQuery()
    const { mutate, isLoading, isSuccess, isError } = useNewItem();
    const { data } = useItemQuery(business?._id)
    const names = useMemo(() => {
        if (!data) return []
        return data.map((item) => item.name)
    }, [data])
    const [category, setCategory] = useState([])

    const [state, setState] = React.useState({
        error: false,
        success: false,
        loading: false,
    })
    const [items, setItems] = useState([])

    const handleSubmit = (e) => {
        setState({ ...state, success: false, error: false, loading: true })
        e.preventDefault()
        const name = e.target.foodName.value
        const category = e.target.category.value
        const desc = e.target.desc.value;

        const data = { name, category, desc, category }
        console.log(data)
        const fileRef = ref(storage, `/product/${name}`);


        uploadBytes(fileRef, file).then((res) => {
            setFile(null)
            getDownloadURL(res.ref).then((url) => {
                mutate({ ...data, image: url })
                e.target.reset();



            })
        }).catch((err) => {
            setState({ ...state, success: false, error: true, loading: false })
            console.log(err);
        });

    }
    useEffect(() => {
        if (isSuccess) {
            setState({ ...state, success: true, error: false, loading: false })
        }
        if (isError) {
            setState({ ...state, success: false, error: true, loading: false })

        }
        setTimeout(() => {
            setState({ ...state, success: false, error: false, loading: false })
        }, 7000)

    }, [isSuccess, isError])
    return <Box sx={{
        p: "10px"
    }}>
        <Title title="New Product" subtitle="New Items" />
        <Box sx={{ borderRadius: '5px', p: 2, bgcolor: mode === 'dark' ? colors.primary[800] : '#fcfcfc' }}>
            <Box p={1} component="form" sx={{ display: 'flex', flexDirection: "column", gap: '1rem' }} onSubmit={handleSubmit} >
                <FormControl sx={{
                    flexDirection: "column",
                    display: 'flex',
                    gap: 1,

                }}>
                    <Typography>Name</Typography>
                    <TextField label="Enter Product Name" name="foodName" required />
                </FormControl>

                <FormControl sx={{
                    flexDirection: "column",
                    display: 'flex',
                    gap: 1,

                }}>
                    <Typography>Category</Typography>
                    <Select
                        required
                        name="category"

                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
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

                {state.loading ? <Button variant="contained" disabled sx={{ bgcolor: colors.primary[500] }}><FastfoodIcon />Loading</Button> :
                    <Button type="submit"
                        sx={{
                            bgcolor: colors.orange[500] + "!important",
                            width: '70px',
                            alignSelf: 'flex-end'
                        }}
                    >Add</Button>
                }
            </Box>
        </Box>
        {state.error || state.success && <Info message={state.success ? 'Suceess🥂🥂' : "There was an error"} />}
    </Box>;
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

export default Item;
