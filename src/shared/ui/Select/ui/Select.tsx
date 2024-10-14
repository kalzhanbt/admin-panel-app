import { MenuItem, SelectProps, } from "@mui/material";
import { StyledSelect, StyledFormControl } from "./Select.styles";

import ArrowDownIcon from "@/assets/icons/ArrowDown.icon.svg?react";

interface TSelectProps extends Omit<SelectProps, ""> {
    placeholder?: string;
    options: TSelectOptionProps[];
    fullWidth?: boolean,
}

interface TSelectOptionProps {
    label: string;
    value: string | number;
}

const Select: React.FC<TSelectProps> = ({ value, fullWidth, placeholder, options = [], ...props }) => {
    return (
        <StyledFormControl fullWidth={fullWidth}>
            <StyledSelect
                displayEmpty
                value={value}
                inputProps={{ 'aria-label': 'Without label' }}
                IconComponent={ArrowDownIcon}
                renderValue={
                    value !== null
                        ? undefined
                        : () => <span className="placeholder">{placeholder}</span>
                }
                {...props}
            >
                <MenuItem disabled value="">
                    <em>{placeholder}</em>
                </MenuItem>
                {options.map((item: TSelectOptionProps) => (
                    <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
                ))}
            </StyledSelect>
        </StyledFormControl>
    );
};

export default Select;