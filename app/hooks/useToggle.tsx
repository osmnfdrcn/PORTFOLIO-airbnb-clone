import { useState, useCallback } from "react";

type UseToggleReturnType = [boolean, () => void];

const useToggle = (initialValue: boolean): UseToggleReturnType => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);
  return [value, toggle];
};

export default useToggle;
