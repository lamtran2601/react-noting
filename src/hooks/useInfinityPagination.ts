import { useRef, useCallback } from 'react';

interface PaginationProps {
  dataLength: number;
  next: (offset: any) => Promise<any>;
}

interface PaginationState {
  onLoadMore: () => void;
}
const useInfinityPagination = (props: PaginationProps): PaginationState => {
  const {
    dataLength, next,
  } = props;

  const offset = useRef(dataLength);
  const isLoading = useRef(false);

  const handleLoadMore = useCallback(() => {
    if (isLoading.current || dataLength < offset.current) {
      return;
    }
    isLoading.current = true;
    next(dataLength).finally(() => {
      offset.current = dataLength + 1;
      isLoading.current = false;
    });
  }, [dataLength]);

  return {
    onLoadMore: handleLoadMore,
  };
};

export default useInfinityPagination;
