import React from "react";
import { DialogContent, DialogTitle, DialogProps } from "@mui/material";

import { StyledDialog } from "./Dialog.styles";
import CloseIcon from "@/assets/icons/Close.icon.svg?react";

interface TDialog extends Omit<DialogProps, 'content'> {
    title?: string,
}

const Dialog: React.FC<TDialog> = ({ title = "", children, onClose = (f) => f, ...props }) => {
    return (
        <StyledDialog
            aria-labelledby="responsive-dialog-title"
            onClose={onClose}
            {...props}
        >
            <DialogTitle id="responsive-dialog-title">
                <span className="close-icon" onClick={(e) => onClose(e, 'backdropClick')}>
                    <CloseIcon />
                </span>
                {title}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </StyledDialog>
    )
}

export default Dialog;