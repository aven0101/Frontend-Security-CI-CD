declare module "@/components/common-ui/CountryCodeInput" {
  import type React from "react";

  export interface CountryCodeInputProps {
    placeholder?: string;
    value?: string;
    onChange?: (v: { countryCode?: string; phoneNumber?: string }) => void;
    selectedCode?: string; // controlled dial code e.g. "+92"
    onCodeChange?: (code: string) => void;
    classNameBtn?: string;
    classNameInput?: string;
    classNameSpan?: string;
  }

  const CountryCodeInput: React.FC<CountryCodeInputProps>;
  export default CountryCodeInput;
}
