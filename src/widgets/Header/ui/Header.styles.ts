import { styled, alpha } from "@mui/system";

export const HeaderRoot = styled("div")(({ theme }) => ({
  width: "100%",
  zIndex: 999,
  top: 0,
  left: 0,
  right: 0,
  position: "fixed",
  backgroundColor: "white",
  borderBottom: "1px solid",
  borderColor: alpha(theme.palette.dark, 0.08)
}));

export const HeaderContent = styled("div")(() => ({
  fontSize: '16px',
  lineHeight: '24px',
  display: "flex",
  height: "68px",
  alignItems: "center",
  justifyContent: "space-between"
}));
