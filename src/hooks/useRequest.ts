import { useEffect, useState } from "react";

interface UseRequestReturn<T> {
  data: T;
  error: any;
  loading: boolean;
}

const useRequest = <T>(service: () => Promise<T>): UseRequestReturn<T> => {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (mounted) {
      return;
    }
    setMounted(true);
    service()
      .then((data) => {
        setState((e: any) => ({ ...e, data, loading: false }));
      })
      .catch((error) => {
        setState((e) => ({ ...e, error, loading: false }));
      });
  }, [service]);

  return state as any;
};

export default useRequest;
