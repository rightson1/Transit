import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ListItemIcon from "@mui/material/ListItemIcon";
import Paper from "@mui/material/Paper";
import React, { useState } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Title from "../../../components/Title";
import { useGlobalProvider } from "../../../utils/themeContext";
import Ctabs from "../../../components/Ctabs"
import { useSingleItemQuery, useUpdateItem } from "../../../utils/hooks/useItems";
import { useRouter } from "next/router";
import { useAuth } from "../../../utils/authContext";
import { CircularProgress, Skeleton } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Delete from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MenuItem from '@mui/material/MenuItem';
import Close from "@mui/icons-material/Close";
import Fab from "@mui/material/Fab";
import Collapse from '@mui/material/Collapse';
import { useEffect } from "react";
import toast from 'react-hot-toast';
import Info from "../../../components/Info"
import CustomOrder from "../../../components/CustomOrder";
import { useCategoryQuery } from "../../../utils/hooks/useBusiness";

const Category = () => {
    const { colors, mode } = useGlobalProvider()
    const [open2, setOpen2] = useState(false);
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false)
    const [options, setOptions] = useState([])
    const [sizes, setSizes] = useState([])
    const { data: categories } = useCategoryQuery();
    const [category, setCategory] = useState("")



    const router = useRouter()
    const { data: item } = useSingleItemQuery(router.query.id)
    const { mutate, isLoading, isSuccess, isError, error } = useUpdateItem(router.query.id)
    useEffect(() => {
        if (isError) {
            console.log(error)
            toast.error(error.message)

        }
    }, [isError])
    useEffect(() => {
        if (item) {
            setOptions(item.options)
            setSizes(item.sizes)

        }
    }, [item])
    useEffect(() => {
        if (categories && item) {
            const cat = categories.find((i) => i._id == item.category)
            setCategory(cat.name)
        }
    }, [categories])

    const handleUpdate = (size, option) => {
        const filtered = options.filter((item) => item !== option)


        if (sizes.length > 0) {
            mutate({
                id: router.query.id,
                sizes: sizes.filter((item) => item !== size)
            })

        }
        if (options.length > 0) {
            mutate({
                id: router.query.id,
                options: filtered
            })
        }


    }
    return item ? <Box>
        <Title title="Products" subtitle="Product Details" />
        <CustomOrder
            {...{
                product: item,
                open: open1,
                setOpen: setOpen1,

            }}

        />
        <Paper elevation={10} sx={{
            margin: "20px !important",
            overflow: 'hidden',
            p: '1rem',
            rounded: '10px',
        }}>
            <Grid container spacing={0} sx={{ height: '100%' }} gap={2}>
                <Grid item className="max-h-[250px]" sx={{
                    bgcolor: colors.primary[mode == "dark" ? 300 : 900],
                    height: '100%',
                    overflow: "hidden",
                    padding: '1rem !important',
                    display: 'flex',
                    flexDirection: 'column',
                    height: {
                        xs: undefined,
                        md: "auto"
                    }
                }}
                    md={4}
                    xs={12}
                    sm={12}

                >
                    <img src={item.image} className="max-h-full object-contain" />
                </Grid>
                <Grid item
                    xs={12} sm={12} md={7}

                    sx={{

                        height: {
                            xs: undefined,
                            md: "70vh"
                        },
                        display: 'flex',
                        flexDirection: 'column',
                        gap: "10px"
                    }}
                >

                    <Typography variant="h3" fontWeight="bold">{item.name} </Typography>
                    <Typography
                        sx={{
                            fontSize: '16px',
                            letterSpacing: '2px'
                        }}
                    >
                        {item.desc}</Typography>


                    <Box
                        display="flex"
                        alignContent="center"
                        gap={2}

                    >
                        <Typography>Category: {category}</Typography>
                        {/* <Typography>Size: {item.kg}kg</Typography> */}


                    </Box>
                </Grid>

            </Grid>


        </Paper>
        <Paper
            elevation={10} sx={{
                margin: "20px !important",
                overflow: 'hidden',
                p: '1rem',
                rounded: '10px',
            }}
        >

            <Ctabs item={item} />

        </Paper>


    </Box> : <Box className="w-full">
        <Skeleton
            width="100%"
            height="10vh"
        ></Skeleton>
        <Skeleton
            width="100%"
            height="50vh"
        ></Skeleton>
        <Skeleton
            width="100%"
            height="10vh"
        ></Skeleton>
    </Box>
};

export default Category;
