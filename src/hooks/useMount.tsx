import { useEffect, useState } from "react";

export const useMount = () => {
  const [isMounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return { isMounted };
};
