"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  placeholder = "Password",
  value,
  onChange,
  error = "",
  classNameInput = "",
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  const handleChange = (e) => {
    if (onChange) {
      onChange(e); // parent controlled
    } else {
      setInternalValue(e.target.value); // local state
    }
  };

  return (
    <div className="relative w-full flex flex-col">
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={value !== undefined ? value : internalValue}
          onChange={handleChange}
          className={`${classNameInput}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#848884] hover:text-[#848884] transition"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {error && <span className="text-red-500 text-sm mt-1 ml-2">{error}</span>}
    </div>
  );
}
