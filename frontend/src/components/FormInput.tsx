import type React from "react";

type FormInputProps = {
  id: string;
  label: string;
  type: "password" | "email";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: string;
  placeholder?: string;
};

const FormInput = ({
  id,
  error,
  label,
  onChange,
  type,
  value,
  placeholder,
}: FormInputProps) => {
  return (
    <div className="flex flex-col items-start gap-1">
      <label htmlFor={id} className="text-text-primary font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        className="input"
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default FormInput;
