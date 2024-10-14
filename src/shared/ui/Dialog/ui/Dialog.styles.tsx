import { styled } from "@mui/material/styles";
import { Dialog, dialogClasses, dialogContentClasses, dialogTitleClasses } from "@mui/material";

export const StyledDialog = styled(Dialog)(() => ({

    [`& .${dialogClasses.paper}`]: {
        borderRadius: '16px',
        minWidth: '300px',
    },
    
    [`& .${dialogTitleClasses.root}`]: {
        minWidth: "430px",
        height: 'auto',
        position: 'relative',
        fontSize: '18px',
        padding: '24px',
        lineHeight: '24px',
        justifyContent: 'center',
        textAlign: 'center',
        whiteSpace: "pre-wrap",

        "& .close-icon": {
            position: 'absolute',
            left: '24px',
            top: '24px',
            padding: '5px',
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            "svg": {
                display: 'block',
                width: '14px',
                height: '14px'
            }
        }
    },
    [`& .${dialogContentClasses.root}`]: {
        padding: '8px 24px 24px !important'
    },
}));