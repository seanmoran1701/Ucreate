import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
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
            <IconButton aria-label="MoreInfo" onClick={handleClickOpen}>
                <HelpIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"What are keywords?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Some styles require the use of keywords in the prompt for
                        best results. {props.moreInfo}
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