import { useMemo } from "react";
import { getPasswordStrength } from "../utils/validation";

export function usePasswordStrength(password) {
  return useMemo(() => getPasswordStrength(password), [password]);
}

export default usePasswordStrength;
