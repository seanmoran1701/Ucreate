import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Popup(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                KEYWORDS
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"KEYWORDS"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.keywords}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    
                    <Button onClick={handleClose} autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

