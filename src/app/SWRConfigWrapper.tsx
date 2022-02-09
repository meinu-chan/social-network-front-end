import React from 'react';
import { SWRConfig } from 'swr';

interface IProps {
  children: React.ReactNode;
}

const SwrConfigWrapper = (props: IProps) => {
  const { children } = props;

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
      }}
    >
      {children}
    </SWRConfig>
  );
};

export default SwrConfigWrapper;
