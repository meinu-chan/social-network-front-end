import { useCallback, useRef } from 'react';

const useLoadMore = (isLoading: boolean, hasMore: boolean, loadMore: () => Promise<void>) => {
  const observer = useRef<IntersectionObserver>();

  const lastMessage = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, isLoading, loadMore]
  );

  return lastMessage;
};

export default useLoadMore;
