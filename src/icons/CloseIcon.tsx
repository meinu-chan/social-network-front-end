import { SvgIcon } from '@mui/material';
import React from 'react';

const CloseIcon = (props: any) => (
  <SvgIcon xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
    <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
      <g stroke="currentColor" strokeWidth="1.5">
        <g>
          <g>
            <path
              d="M12 0L0 12M0 0L12 12"
              transform="translate(-836 -122) translate(836 122) translate(6 6)"
            />
          </g>
        </g>
      </g>
    </g>
  </SvgIcon>
);

export default CloseIcon;
