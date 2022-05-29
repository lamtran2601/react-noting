import { useRef, useCallback } from 'react';

interface PaginationProps {
  dataLength: number;
  limit: number;
  next: (_: number) => void;
}

interface PaginationState {
  offset: number;
  onLoadMore: () => void;
}

const useInfinityPagination = (props: PaginationProps): PaginationState => {
  const {
    dataLength, limit, next,
  } = props;
  const offset = useRef(0);

  const handleLoadMore = useCallback(() => {
    if (dataLength < offset.current) {
      return;
    }
    next(offset.current);
    offset.current += limit;
  }, [dataLength]);

  return {
    offset: offset.current,
    onLoadMore: handleLoadMore,
  };
};

export default useInfinityPagination;
