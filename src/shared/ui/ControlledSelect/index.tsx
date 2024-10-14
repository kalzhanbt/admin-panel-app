import { Controller } from 'react-hook-form';
import { Select } from '../Select';
import { SelectProps } from '@mui/material';

interface FormSelectProps {
  inputName: string;
  inputControl: any;
  options: TSelectOptionProps[];
  error?: any;
  rules?: any;
  placeholder?: string;
  disabled?: boolean;
}

interface TSelectOptionProps {
  label: string;
  value: string | number;
}


export function SelectController({
  inputName,
  inputControl,
  options,
  error,
  rules,
  placeholder,
  disabled = false
}: FormSelectProps) {
  return (
    <Controller
      name={inputName}
      control={inputControl}
      defaultValue=""
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <Select
          value={value}
          onChange={onChange} // Pass onChange to the Select
          onBlur={onBlur} // Pass onBlur to the Select
          placeholder={placeholder}
          options={options}
          error={!!error} // You can handle the error state as needed
          disabled={disabled}
        />
      )}
    />
  );
}
