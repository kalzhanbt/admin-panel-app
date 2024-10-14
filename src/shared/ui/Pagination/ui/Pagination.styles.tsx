import { alpha, styled } from "@mui/material/styles";
import { Stack, Pagination, paginationItemClasses } from "@mui/material";

export const StyledStack = styled(Stack)(() => ({
    alignItems: "center",
}));

export const StyledPagination = styled(Pagination)(({ theme }) => ({
    fontSize: "16px",
    lineHeight: "24px",
    width: "fit-content",
    [`& .${paginationItemClasses.outlined}`]: {
        borderColor: '#ECECED',
        outline: "none",
    },
    [`& .${paginationItemClasses.selected}`]: {
        backgroundColor: `${theme.palette.dark} !important`,
        borderColor: theme.palette.dark,
        color: '#FFF',
        '&:hover': {
            backgroundColor: `${theme.palette.dark} !important`,
        }
    },
    [`& .${paginationItemClasses.firstLast}, & .${paginationItemClasses.previousNext}`]: {
        border: 'none',
        color: alpha(theme.palette.dark, 0.32),

        '&:hover': {
            backgroundColor: 'transparent',
        }
    },
}));

