import { useState, useCallback } from "react";

type UseToggleReturn = [boolean, () => void];

const useToggle = (initialValue: boolean): UseToggleReturn => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);
  return [value, toggle];
};

export default useToggle;
