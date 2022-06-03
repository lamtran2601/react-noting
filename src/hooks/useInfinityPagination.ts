import { useRef, useCallback } from 'react';

interface PaginationProps {
  dataLength: number;
  limit: number;
  next: (offset: number) => any;
}

interface PaginationState {
  onLoadMore: () => void;
}
const useInfinityPagination = (props: PaginationProps): PaginationState => {
  const {
    dataLength, next, limit,
  } = props;

  const offset = useRef(dataLength);

  const handleLoadMore = useCallback(() => {
    const isNoMore = offset.current > dataLength;
    if (isNoMore) {
      return;
    }
    offset.current = dataLength + limit;
    next(dataLength);
  }, [dataLength, offset.current]);

  return {
    onLoadMore: handleLoadMore,
  };
};

export default useInfinityPagination;
