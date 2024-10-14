import { styled } from "@mui/material";

export const LoginPageRoot = styled("div")(() => ({
  padding: "82px 0",
  margin: "0 auto",
  maxWidth: "400px",
}));

export const TableCellContentWrapper = styled("div")(() => ({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  "& svg": {
    minWidth: "24px",
    borderRadius: "2px",
  },
}));
