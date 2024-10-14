import { alpha, styled } from "@mui/material";
import { TextField, inputBaseClasses, inputLabelClasses, formLabelClasses } from "@mui/material";

export const TextFieldStyled = styled(TextField)(({ theme }) => ({

  [`& .${inputLabelClasses.root}`]: {
    fontSize: "14px",
    lineHeight: "20px",

    [`&.${inputLabelClasses.focused}, &.${formLabelClasses.filled}`]: {
      display: "none",
    }
  },

  [`& .${inputBaseClasses.root}`]: {
    padding: 0,
  },

  [`& .${inputBaseClasses.input}`]: {
    padding: "14px 16px",
    fontSize: "14px",
    lineHeight: "20px",
  },

  "& .MuiFilledInput-root": {
    height: "100%",
    overflow: "hidden",
    borderRadius: 6,
    border: "1px solid",
    backgroundColor: "white",
    borderColor:
      theme.palette.mode === "light"
        ? alpha(theme.palette.dark, 0.12)
        : theme.palette.blue,
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      borderWidth: 1,
    },
    "&.Mui-focused": {
      borderWidth: 1,
      backgroundColor: "white",
      boxShadow: `${alpha(theme.palette.dark, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.dark,
    },
    "&::after, &::before": {
      display: "none",
    },
  },
}));
