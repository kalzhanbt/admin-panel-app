import React from "react";
import { TextFieldProps } from '@mui/material/TextField';

import { TextFieldStyled } from "./Input.styles";

const Input: React.FC<TextFieldProps> = (props) => {
    return (
        <TextFieldStyled {...props} />
    )
};

export default Input;