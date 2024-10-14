import { styled, alpha } from "@mui/material";

import { TableCell, tableCellClasses } from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    maxWidth: "100px",
    whiteSpace: "nowrap",
    overflow: "hidden",

    [`&.${tableCellClasses.head}`]: {
        color: alpha(theme.palette.dark, 0.64),
        // textOverflow: 'ellipsis',
        // borderRight: "1px solid",
        // borderColor: "#E8E8E8",
        backgroundColor: alpha(theme.palette.dark, 0.04),
        padding: "12px 16px",
        fontSize: "12px",
        lineHeight: "16px",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: "14px",
        lineHeight: "20px",
        padding: "16px",
    },
}));