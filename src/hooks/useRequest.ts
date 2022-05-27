import { useEffect, useState } from 'react';

interface UseRequestReturn<T> {
  data: T | null;
  error: any;
  loading: boolean;
}

const useRequest = <T>(service: () => Promise<T>, deps: any[] = []): UseRequestReturn<T> => {
  const [state, setState] = useState<UseRequestReturn<T>>({
    data: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    if (!state.loading) {
      setState((e) => ({ ...e, loading: true }));
    }
    service()
      .then((data) => {
        setState({ error: null, data, loading: false });
      })
      .catch((error) => {
        setState({ error, data: null, loading: false });
      });
  }, deps);

  return state as any;
};

export default useRequest;
