import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import React from "react";
import Title from "../../components/Title";
import { useGlobalProvider } from "../../utils/themeContext";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import TextField from '@mui/material/TextField';
import { FormControl } from "@mui/material";
import { useAllCategoryQuery, useCategoryMutatation, useCategoryQuery, useGasCategoryQuery } from "../../utils/hooks/useBusiness";
import { useEffect } from "react";
import { useAuth } from "../../utils/authContext";
import { toast, Toaster } from "react-hot-toast";
import Autocomplete from '@mui/material/Autocomplete';
import { useMemo } from "react";
import { useState } from "react";
import { Collapse, Fab, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Delete from '@mui/icons-material/Delete';




const Item = () => {
    const { mutate, isLoading, isSuccess, isError } = useCategoryMutatation();
    const [packages, setPackages] = useState([])
    const [packageName, setPackageName] = useState()
    const [price, setPrice] = useState()
    const [open2, setOpen2] = useState(true)
    const handlePackage = () => {
        console.log(packageName, price)
        if (!packageName || !price) return
        const option = { packageName, price }
        setPackages([...packages, option])
        setPackageName('')
        setPrice('')
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(packages)
        const { name, description } = e.target.elements;

        mutate({ name: name.value, description: description.value, available: true, packages })
        e.target.reset()

    }
    useEffect(() => {
        if (isError) {
            toast.error('Error')
        }
        if (isSuccess) {
            toast.success('Success')
        }

    }, [isError, isSuccess])
    const { colors, mode } = useGlobalProvider()
    return <Box sx={{
        p: {
            xs: '10px',

        }
    }}>
        <Title title="New Category" subtitle="New Category" />
        <Box
            onSubmit={handleSubmit}
            sx={{ mx: 1, p: 2, borderRadius: '10px', py: 2, bgcolor: mode === 'dark' ? colors.primary[800] : '#fcfcfc' }} >
            <Box p={1} component="form" sx={{ display: 'flex', flexDirection: "column", gap: '2rem' }}  >

                <FormControl sx={{
                    flexDirection: "column",
                    display: 'flex',
                    gap: 1,

                }}>
                    <Typography>Name</Typography>
                    <TextField label="Enter Category Name" name="name" required />
                </FormControl>
                <FormControl sx={{
                    flexDirection: "column",
                    display: 'flex',
                    gap: 1,

                }}>
                    <Typography>Description</Typography>
                    <TextField label="Enter Cartegory Description" name="description"
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
                            <List component="div" disablePadding>
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
                    >Add</Button>
                }
            </Box>

        </Box>
        <Toaster />
    </Box>;
};


export default Item;
