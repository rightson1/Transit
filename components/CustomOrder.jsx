
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useGlobalProvider } from '../utils/themeContext';
import { useAuth } from '../utils/authContext';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useNewOrder } from "../utils/hooks/useOrder";
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
const CustomOrder = ({ open, setOpen, product }) => {
    const { colors } = useGlobalProvider();
    const { mutate, isSuccess, isError } = useNewOrder();
    const { business } = useAuth();
    useEffect(() => {

        if (isSuccess) {

        }
        else if (isError) {
            toast.error("There was an error")
        }
    }, [isError, isSuccess])

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.loading('Creating Sale...')
        const items = [{ ...product, qty: 1 }]
        const name = e.target[0].value
        const id = business?._id;
        const data = {
            name, total: product.price, business: id, custom: true,
            type: business?.type, items, status: 'Delivered', date: {
                day: new Date().getDate(),
                week: Math.ceil((new Date()).getDate() / 7),
                month: new Date().getMonth(),
            },
            payment: 'Paid'
        }
        const cartRef = collection(db, 'orders')

        addDoc(cartRef, {
            business: id,
            status: 'Pending',
            name: business?.name,
            read: 'false',
            message: `You sold ${product.name} to ${name}`,
            userName: name,
            date: {
                day: new Date().getDate(),
                week: Math.ceil((new Date()).getDate() / 7),
                month: new Date().getMonth(),
            }
        }).then((res) => {
            const realId = res.id
            toast.dismiss();
            mutate({ realId, ...data })
        }).catch((err) => {
            toast.dismiss()
            toast.error('Error', {
                timeout: 2000
            })

        })

        setOpen(false)

    }
    return <Dialog open={open} sx={{
        '& .MuiDialog-paper': {
            backgroundColor: "white",
            color: colors.primary[500],
            width: '100%',
            maxWidth: '500px',
            borderRadius: '10px',
            padding: '20px',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.45)',
        }

    }}
        component="form"
        onSubmit={handleSubmit}

    >
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent>

            <Box className="my-5  flex flex-col gap-2">
                <Box>
                    <Typography>Customer Name</Typography>
                    <TextField
                        sx={{
                            '& .MuiInputLabel-root': {
                                color: colors.primary[500],
                            },
                            '& .MuiInputBase-input': {
                                color: colors.primary[500],
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: colors.primary[500],
                                },
                                '&:hover fieldset': {
                                    borderColor: colors.primary[500],
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: colors.primary[500],
                                },
                            },
                        }}
                        autoFocus margin="dense" id="name" label="Name" type="text" fullWidth />

                </Box>

            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={() => setOpen(false)} >Cancel</Button>
            <Button type="submit">Submit</Button>
        </DialogActions>
    </Dialog>
};

export default CustomOrder;
