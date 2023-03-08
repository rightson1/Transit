import React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
export default function Info({ message }) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {

        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>)
    React.useEffect(() => {
        setOpen(!!message)
    }, [message])

    return (
        <div>
            <Snackbar
                open={open}
                onClose={handleClose}
                message={message}
                action={action}

            />
        </div>
    );
}
