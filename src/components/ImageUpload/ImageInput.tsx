import React from 'react';
import clsx from 'clsx';
import EyeOpenIcon from '../../icons/EyeOpenIcon';
import { makeStyles } from '@mui/styles';
import { Card, CardActionArea, CircularProgress, Theme, Tooltip } from '@mui/material';
import ImageAsync from '../ImageAsync';
import LabelLoader from '../LabelLoader';

interface IProps {
  isError?: boolean;
  disabled?: boolean;
  inputId: string;
  variant: 'small' | 'normal';
  isUploading: boolean;
  uploadProgress: number;
  acceptedFiles: string;
  link?: string;
  handleFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  input: {
    visibility: 'hidden',
    width: 0,
    height: 0,
  },
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    border: `2px dashed ${theme.palette.grey.A700}`,
  },
  rootNormal: {
    width: '100%',
    height: 250,
  },
  rootSmall: {
    width: 80,
    height: 80,
  },
  error: {
    border: `2px dashed ${theme.palette.error.main}`,
  },
  imageNormal: {
    width: '100%',
    height: 250,
    objectFit: 'cover',
    borderRadius: 10,
  },
  imageSmall: {
    width: 80,
    height: 80,
    objectFit: 'cover',
    borderRadius: 10,
  },
  loader: {
    color: theme.palette.primary.main,
  },
  actionArea: {
    position: 'relative',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      cursor: 'pointer',
    },
  },
  icon: {
    color: 'inherit',
    width: 40,
    height: 40,
  },
  centered: {
    position: 'absolute',
    top: 'calc(50% - 20px)',
    left: 'calc(50% - 20px)',
  },
  disabled: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
}));

const ImageInput = (props: IProps) => {
  const {
    variant,
    isUploading,
    uploadProgress,
    inputId,
    disabled,
    isError,
    acceptedFiles,
    link,
    handleFileSelect,
    inputValue,
  } = props;

  const classes = useStyles();

  return (
    <Card
      className={clsx({
        [classes.root]: true,
        [classes.rootNormal]: variant !== 'small',
        [classes.rootSmall]: variant === 'small',
        [classes.error]: isError,
        [classes.disabled]: disabled,
      })}
    >
      <Tooltip title={'Select file'}>
        <CardActionArea
          component="label"
          className={classes.actionArea}
          htmlFor={`file-upload-${inputId}`}
          disabled={isUploading || disabled}
        >
          {link && (
            <ImageAsync
              src={link}
              alt={'alt'}
              className={variant === 'small' ? classes.imageSmall : classes.imageNormal}
            />
          )}
          <span className={classes.centered}>
            {!isUploading && <EyeOpenIcon className={classes.icon} />}
            {isUploading && uploadProgress === 0 && (
              <CircularProgress className={classes.loader} size={40} />
            )}
            {isUploading && uploadProgress !== 0 && (
              <LabelLoader value={uploadProgress} variant="determinate" size={40} />
            )}
          </span>
        </CardActionArea>
      </Tooltip>
      <input
        type="file"
        disabled={isUploading || disabled}
        className={classes.input}
        onChange={handleFileSelect}
        id={`file-upload-${inputId}`}
        name={`file-upload-${inputId}`}
        value={inputValue}
        accept={acceptedFiles}
      />
    </Card>
  );
};

export default ImageInput;
