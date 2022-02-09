import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme, Button } from '@mui/material';

interface IProps {
  disabled?: boolean;
  inputId: string;
  isUploading: boolean;
  acceptedFiles: string;
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
    height: 400,
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
    height: '100%',
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
  const { isUploading, inputId, disabled, acceptedFiles, handleFileSelect, inputValue } = props;

  const classes = useStyles();

  return (
    <>
      <Button component="label">
        Choose another image
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
      </Button>
    </>
  );
};

export default ImageInput;
