import { List, ListProps } from '@mui/material';
import React, { useEffect } from 'react';
import useOnScreen from '../hooks/useOnScreen';

interface IProps extends ListProps {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  lastItem: React.RefObject<Element>;
  children: React.ReactElement[];
  loader: React.ReactNode;
  showLoader: boolean;
}

function InfiniteScroll({
  loadMore,
  hasMore,
  children,
  lastItem,
  loader,
  showLoader,
  ...listProps
}: IProps) {
  const isVisible = useOnScreen(lastItem);

  useEffect(() => {
    if (isVisible && hasMore && !showLoader) loadMore();
  }, [hasMore, isVisible, loadMore, showLoader]);

  return (
    <List {...listProps}>
      {children}
      {showLoader && loader}
    </List>
  );
}

export default InfiniteScroll;
