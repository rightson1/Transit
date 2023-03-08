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
import Fab from "@mui/material/Fab";
import Collapse from '@mui/material/Collapse';
import { useEffect } from "react";
import CustomOrder from "../../../components/CustomOrder";
import { useBusinessQuery, useCategoryQuery, useCategoryUpdate } from "../../../utils/hooks/useBusiness";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import TextField from '@mui/material/TextField';
import { FormControl } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";

const Category = () => {
    const { colors, mode } = useGlobalProvider()
    const [open2, setOpen2] = useState(true);
    const { data, isLoading } = useCategoryQuery();
    const { data: business } = useBusinessQuery();
    const [item, setItem] = useState(null)
    const router = useRouter();
    const { id } = router.query;
    const [packages, setPackages] = useState([])
    const [price, setPrice] = useState(0)
    const [packageName, setPackageName] = useState('')
    const [values, setValues] = useState(null);
    const { mutateAsync: updateCategory, isError, isSuccess } = useCategoryUpdate()


    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    }
    useEffect(() => {
        if (data) {
            setItem(data.find(item => item._id === id));
            setPackages(data.find(item => item._id === id).packages)
        }
    }, [data])
    const handleSubmit = (e) => {
        e.preventDefault();
        updateCategory({ id, ...values, packages })
        e.target.reset()

    }

    useEffect(() => {
        if (isError) {
            console.log(error)
            toast.error('Something went wrong')
        }
        else if (isSuccess) {
            toast.success('Category Updated')
        }
    }, [isError, isSuccess])
    const handlePackage = () => {
        if (!packageName || !price) return
        const option = { packageName, price }
        setPackages([...packages, option])
        setPackageName('')
        setPrice('')
    }
    return item ? <Box>
        <Title title="Category" subtitle="Category Details" />
        <Box sx={{
            overflow: 'hidden',
            p: '1rem',
            rounded: '10px',
        }}>
            <Grid container spacing={0} sx={{
                height: {
                    xs: undefined,
                    md: "170vh"
                }
            }} gap={2}

            >
                <Grid item className="max-h-[250px]"
                    md={4}
                    xs={12}
                    sm={12}

                >
                    <Typography variant="h3" fontWeight="bold" color={colors.orange[500]} className="underline" >{item.name}</Typography>

                    <Typography variant="h6" fontWeight="bold" mt={3} color={colors.orange[300]} >Category Desscription</Typography>
                    <Typography variant="h6" fontWeight="thin" color={colors.grey[100]} >{item.description}</Typography>

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

                    <Typography variant="h3" fontWeight="bold" color={colors.orange[500]} className="underline" >Edit Category</Typography>


                    <Box
                        onSubmit={handleSubmit}
                        sx={{ eborderRadius: '10px', py: 2, bgcolor: mode === 'dark' ? colors.primary[800] : '#fcfcfc' }} >
                        <Box p={1} component="form" sx={{ display: 'flex', flexDirection: "column", gap: '2rem' }}  >

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
                                <Typography>Description</Typography>
                                <TextField label={item.description} name="description"
                                    onChange={handleChange}
                                />
                            </FormControl>
                            <FormControl className="flex flex-col gap-2  item-center">
                                <Typography>Packages</Typography>
                                <Box className="flex justify-between" gap={1}>
                                    <TextField label="Packages" value={packageName} onChange={(e) =>
                                        setPackageName(e.target.value)
                                    }
                                        helperText="Enter Packages in Class" fullWidth />
                                    <TextField type="number" label="Price " value={price} onChange={(e) => setPrice(e.target.value)} helperText="Price for Each Package" fullWidth />
                                </Box>
                                <Button
                                    sx={{
                                        bgcolor: colors.orange[500] + "!important",
                                        width: '70px'
                                    }}
                                    onClick={() => {
                                        handlePackage()
                                    }}
                                >Add</Button>
                                <List>
                                    <ListItem disableGutters disablePadding onClick={() => setOpen2(!open2)}>
                                        <ListItemButton sx={{
                                            bgcolor: colors.primary[800],

                                        }}>
                                            <ListItemText primary="View Added Packages" sx={{
                                                color: colors.grey[500]
                                            }} />
                                            <KeyboardArrowDownIcon />
                                        </ListItemButton>
                                    </ListItem>
                                    <Collapse in={open2} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding overflow="auto">
                                            {
                                                packages?.length > 0 && packages.map((item, index) => {

                                                    return <ListItem key={index}>
                                                        <ListItemText primary={item.packageName} secondary={item.price} />
                                                        <ListItemIcon>
                                                            <IconButton>
                                                                <Fab size="small" onClick={() => {
                                                                    setPackages(packages.filter((thing) => thing !== item))
                                                                }}>
                                                                    <Delete sx={{ color: colors.grey[100] }} />
                                                                </Fab>
                                                            </IconButton>
                                                        </ListItemIcon>
                                                    </ListItem>
                                                })
                                            }
                                        </List>
                                    </Collapse>
                                </List>

                            </FormControl>



                            {isLoading ? <Button variant="contained" disabled sx={{ bgcolor: colors.primary[500] }}><FastfoodIcon />Loading</Button> :
                                <Button type="submit"
                                    sx={{
                                        bgcolor: colors.orange[500] + "!important",
                                        width: '70px',
                                        alignSelf: 'flex-end'
                                    }}
                                >Submit</Button>
                            }
                        </Box>

                    </Box>
                </Grid>

            </Grid>


        </Box>



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
