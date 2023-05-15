import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  labelSet?: string;
  inputSet?: string;
}

const CustomInput: FC<InputProps> = ({
  label,
  labelSet,
  inputSet,
  ...props
}) => {
  return (
    <>
      <label className={`${labelSet}`}>{label}</label>
      <input
        className={`input input-bordered bg-white ${inputSet}`}
        {...props}
      />
    </>
  );
};

export default CustomInput;
