import { useState, useCallback } from 'react';

const useToggle = (initialState: boolean) => {
  // Use this react hook to avoid re renders when togglin a react state
  const [isToggled, setIsToggled] = useState<boolean>(initialState);

  const toggle = useCallback(() => setIsToggled((state) => !state), [setIsToggled]);

  return [isToggled, toggle] as const;
};

export default useToggle;
