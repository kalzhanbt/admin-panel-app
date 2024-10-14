import { Input } from '../Input'
import { Controller } from 'react-hook-form'

interface FormInputProps {
  inputName: string
  inputControl: any
  type: string
  error: any
  rules?: any
  InputProps?: any
  inputLabel?: string
  helperText?: string
  errorMessage?: string
  placeholder?: string
  disabled?: boolean
}

export function InputController({
  inputName,
  inputControl,
  error,
  type,
  rules,
  inputLabel,
  InputProps,
  helperText,
  errorMessage,
  placeholder,
  disabled = false
}: FormInputProps) {
  return (
    <Controller
      name={inputName}
      control={inputControl}
      defaultValue=""
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          fullWidth
          type={type}
          label={inputLabel}
          onBlur={onBlur}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          error={!!error}
          InputProps={InputProps}
          disabled={disabled}
          helperText={!!error ? errorMessage : helperText}
        />
      )}
      rules={rules}
    />
  )
}
