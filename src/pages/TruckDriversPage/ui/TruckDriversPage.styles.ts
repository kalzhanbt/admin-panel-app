import { styled } from "@mui/material";

export const MainPageRoot = styled("div")(() => ({
  padding: "24px 0",
  width: "100%",
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
