import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import React, { useState } from "react";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Title from "../../../components/Title";
import { useGlobalProvider } from "../../../utils/themeContext";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useGetOrder, useOrderUpdate } from "../../../utils/hooks/useOrder";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/firebase";
import { Toaster, toast } from "react-hot-toast";
import { useAuth } from "../../../utils/authContext";
const Category = () => {
    const { colors, mode } = useGlobalProvider()
    const { id } = useRouter().query;
    const { business } = useAuth();
    const { data: order } = useGetOrder(id)
    const [status, setStatus] = useState("")
    const [open, setOpen] = useState(false);
    const [payment, setPayment] = useState(null);
    const { mutate, isSuccess, isError } = useOrderUpdate(business?._id)
    useEffect(() => {
        setStatus(order?.status)
        setPayment(order?.payment)
    }, [order])

    const submit = (e) => {
        e.preventDefault()
        const docRef = doc(collection(db, "orders"), order.realId)
        const update = () => updateDoc(docRef, {
            status,
        }).then(() => {

            mutate({ id: order.realId, status })

        })
        toast.promise(update(), {
            loading: "Updating...",
            success: "Updated",
            error: "Error"
        })

    }
    const submitPayment = (e) => {
        e.preventDefault()
        mutate({ id: order.realId, payment })

    }
    useEffect(() => {
        if (isSuccess) {
            toast.success("Updated")
        }
        if (isError) {
            toast.error("Error")
        }
    }, [isSuccess, isError])
    return <Box>
        <Title title="Orders" subtitle="Order Details" />
        <Paper elevation={10} sx={{
            m: {
                xs: '10px !important',
                md: "20px !important",
            },
            mr: '6px !important',
            overflow: 'hidden',
            p: '1rem',
            rounded: '10px',
        }}>
            {
                order ? <Grid container spacing={0} sx={{ height: '100%' }} gap={2} >
                    <Grid item
                        xs={12} sm={12}

                        sx={{

                            height: {
                                xs: undefined,
                                md: "70vh"
                            },

                        }}
                    >
                        <div className="flex  md:justify-between items-center flex-wrap " >
                            <Box justifyContent="flex-start" className="flex gap-3 h-[40px] justify-between w-full" component="form" onSubmit={submit}>

                                <Button sx={{ color: colors.grey[900], background: colors.teal[500] + '!important' }} >Order Status</Button>

                                <Select
                                    value={status}
                                    required
                                    label="Status"
                                    className="w-[100px] flex-1"
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    {["Pending", "Cancelled", "Processing", "Delivered"].map((status) => (
                                        <MenuItem key={status} value={status}>

                                            {status}
                                        </MenuItem>
                                    ))}

                                </Select>
                                <Button type="submit" sx={{ color: colors.grey[900], background: colors.teal[500] + '!important' }} >Submit</Button>

                            </Box>
                            <Box justifyContent="flex-start" className="flex gap-3 h-[40px] my-5 justify-between w-full" component="form" onSubmit={submitPayment}>

                                <Button sx={{ color: colors.grey[900], background: colors.teal[500] + '!important' }} >Payment</Button>
                                <Select
                                    value={payment}
                                    required
                                    label="Status"
                                    className="w-[100px] flex-1"

                                    onChange={(e) => setPayment(e.target.value)}
                                >
                                    {["Pending", "Paid"].map((status) => (
                                        <MenuItem key={status} value={status}>

                                            {status}
                                        </MenuItem>
                                    ))}

                                </Select>

                                <Button type="submit" sx={{ color: colors.grey[900], background: colors.teal[500] + '!important' }} >Submit</Button>

                            </Box>
                        </div>
                        <div className="flex justify-between">
                            <Typography my={1} variant="h3" fontWeight="bold" color={colors.orange[500]}>{order.name}</Typography>
                            <Typography my={1} variant="h3" fontWeight="bold" color={colors.primary[100]}>{order.custom ? 'Local' : 'Online'}</Typography>
                        </div>

                        <TableContainer elevation={0}>
                            <Table sx={{ minWidth: 400 }} aria-label="simple table">

                                <TableHead>
                                    <TableRow>

                                        <TableCell>
                                            <Typography variant="h6">
                                                Name
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                Quanity
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                size
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                Option
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography variant="h6">
                                                Price
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="h6">
                                                View
                                            </Typography>
                                        </TableCell>


                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {order.items.map((product, index) => (
                                        <>
                                            <TableRow key={index}>

                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "15px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {product.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "15px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {product.qty}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "15px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {product?.sizes?.name}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "15px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {product?.options?.optionName}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "15px",
                                                            fontWeight: "500",
                                                        }}
                                                    >
                                                        {product.price}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        sx={{
                                                            color: colors.grey[900],
                                                            background: colors.teal[500] + '!important'
                                                        }}
                                                    >Item</Button>
                                                </TableCell>


                                            </TableRow>

                                        </>
                                    ))}
                                    <TableFooter>
                                        <TableRow>
                                            <TableCell colSpan={3}>
                                                <Typography variant="h5" className="font-bold">Total</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5" className="font-bold">{order.total}</Typography>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell colSpan={3}>
                                                <Typography variant="h5" className="font-bold">Total</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography variant="h5" className="font-bold">{order.total}</Typography>
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {
                            order.details && <Box className="my-5">
                                <Typography my={1} variant="h3" fontWeight="bold" color={colors.orange[500]}>Order Details</Typography>
                                <Typography>{order.detail}</Typography>
                            </Box>
                        }
                        <Box className="my-5">
                            <Typography my={1} variant="h5" fontWeight="bold" color={colors.orange[500]}>Customer Details</Typography>
                            <Typography color={colors.orange[500]}>Location</Typography>
                            <Typography>{order.location}</Typography>

                            <Typography color={colors.orange[500]}>Phone Number</Typography>
                            <Typography>0779749554</Typography>
                        </Box>

                    </Grid>

                </Grid> : <Skeleton width="full" height={400}>
                </Skeleton>


            }
            <Toaster />
        </Paper>
        {/* <Paper
            elevation={10} sx={{
                m: {
                    xs: '10px !important',
                    md: "20px !important",
                },
                mr: '6px !important',
                overflow: 'hidden',
                p: '1rem',
                rounded: '10px',
            }}
        >

            <Ctabs item={true} order={order} />

        </Paper> */}


    </Box>;
};


export default Category;
