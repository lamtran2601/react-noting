import { useRef, useCallback } from 'react';

interface PaginationProps {
  dataLength: number;
  next: (_: number) => void;
}

interface PaginationState {
  offset: number;
  onLoadMore: (onDone?: () => void) => void;
}

const useInfinityPagination = (props: PaginationProps): PaginationState => {
  const {
    dataLength, next,
  } = props;
  const offset = useRef(0);

  const handleLoadMore = useCallback((onDone?: () => void) => {
    if (dataLength < offset.current) {
      return;
    }
    next(offset.current);
    offset.current = dataLength;
    onDone?.();
  }, [dataLength]);

  return {
    offset: offset.current,
    onLoadMore: handleLoadMore,
  };
};

export default useInfinityPagination;
