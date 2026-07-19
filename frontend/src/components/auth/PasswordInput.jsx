import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Input from "../ui/Input";

function PasswordInput({
  id,
  name = "password",
  label = "Password",
  error,
  value,
  onChange,
  onBlur,
  autoComplete = "current-password",
  placeholder = "••••••••",
  ...rest
}) {
  const [visible, setVisible] = useState(false);

  return (
    <Input
      id={id || name}
      name={name}
      label={label}
      type={visible ? "text" : "password"}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      autoComplete={autoComplete}
      placeholder={placeholder}
      rightSlot={
        <button
          type="button"
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-white/5 hover:text-white"
          aria-label={visible ? "Hide password" : "Show password"}
          onClick={() => setVisible((v) => !v)}
          tabIndex={0}
        >
          {visible ? <FiEyeOff size={16} /> : <FiEye size={16} />}
        </button>
      }
      {...rest}
    />
  );
}

export default PasswordInput;
