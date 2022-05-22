import { RealtimeSubscription } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const useSubscription = <T>(service: (callback: (args: any) => void)
    => Promise<RealtimeSubscription>) => {
  const [data, setData] = useState<T>();
  const [subscription, setSubscription] = useState<RealtimeSubscription>({} as any);
  useEffect(() => {
    service((e) => {
      setData(e);
    }).then(setSubscription);
    return () => {
      if (!subscription?.isClosed) {
        // subscription?.unsubscribe();
      }
    };
  }, []);
  return { data, subscription };
};

export default useSubscription;
