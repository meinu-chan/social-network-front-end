import { Hidden, Skeleton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import EyeOpenIcon from '../icons/EyeOpenIcon';
import useSWR from 'swr';
import { generateGetUrl } from '../api/awsApi';
import clsx from 'clsx';

interface IProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: 200,
  },
  icon: {
    width: '100%',
    height: 'auto',
  },
});

const ImageAsync = (props: IProps) => {
  const { src, alt, ...rest } = props;
  const classes = useStyles();

  const async = src.indexOf('http') === -1;

  const { data, error } = useSWR(async ? src : null, () => generateGetUrl({ key: src }));

  const [isBroken, setIsBroken] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleBrokenLink = () => {
    setIsBroken(true);
    setIsLoading(false);
  };

  const handleLoaded = () => {
    setIsLoading(false);
  };

  if (isBroken || !src || error) {
    return <EyeOpenIcon className={clsx(classes.icon, rest.className)} />;
  }

  return (
    <>
      <img
        src={async ? data?.url : src}
        alt={alt}
        {...rest}
        onError={handleBrokenLink}
        onLoad={handleLoaded}
        {...(isLoading && {
          style: {
            display: 'none',
          },
        })}
      />
      <Hidden
        implementation="js"
        {...(!isLoading && {
          xsDown: true,
          xsUp: true,
        })}
      >
        <Skeleton
          variant="rectangular"
          className={clsx(classes.root, rest.className)}
          {...(rest.style && { style: rest.style })}
        />
      </Hidden>
    </>
  );
};

export default ImageAsync;
