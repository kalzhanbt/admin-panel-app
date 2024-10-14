import { styled, alpha } from "@mui/material/styles";
import { Select, FormControl, selectClasses } from "@mui/material";

export const StyledFormControl = styled(FormControl)(() => ({
    minWidth: "220px",
    width: "100%",
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
    alignItems: "center",
    borderRadius: "6px",
    fontSize: "14px",
    lineHeight: "20px",
    "& .placeholder": {
        color: alpha(theme.palette.dark, 0.48)
    },
    [`& .${selectClasses.outlined}`]: {
        padding: "14px 16px",
        paddingRight: "40px !important",
    },
    [`& .${selectClasses.icon}`]: {
        right: "22px",
        top: "calc(50% - 4px)"
    }
}));