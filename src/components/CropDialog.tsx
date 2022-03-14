import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import getCroppedImage from '../helpers/getCroppedImage';
import CloseIcon from '../icons/CloseIcon';
import { BlobWithName } from '../types/common';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const useStyles = makeStyles({
  title: {
    padding: '20px 24px',
  },
  cropContainer: {
    minWidth: '50vh',
    minHeight: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& img': {
      maxHeight: '60vh',
      width: '100%',
      height: '100%',
    },
  },
  reactCrop: {
    width: '100% !important',
    height: '100% !important',
  },
  closeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
  },
  actions: {
    padding: '8px 24px 16px',
  },
});

interface Props {
  fileUrl: string;
  isOpen: boolean;
  cropSettings?: Crop;
  locked?: boolean;
  onClose: () => void;
  onSubmit: (file: BlobWithName) => void;
}

const CropDialog: React.FC<Props> = (props: Props) => {
  const { onClose, isOpen, fileUrl, onSubmit, cropSettings, ...rest } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const initialCrop: Crop = useMemo(
    () =>
      cropSettings || {
        unit: '%',
        width: 50,
        height: 50,
        aspect: 1,
        x: 0,
        y: 0,
      },
    [cropSettings]
  );

  const imgRef = useRef<HTMLImageElement | null>(null);

  const [crop, setCrop] = useState<Crop>(initialCrop);

  const [completedCrop, setCompletedCrop] = useState<Crop>(initialCrop);

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    setCrop(initialCrop);
    setCompletedCrop(initialCrop);
  }, [initialCrop, onClose]);

  const handleSubmit = useCallback(async () => {
    if (completedCrop.width === 0 || completedCrop.height === 0) {
      enqueueSnackbar('Select crop area', { variant: 'warning' });
    } else if (imgRef.current) {
      try {
        const croppedImage = await getCroppedImage(imgRef.current, completedCrop);

        if (croppedImage) {
          onSubmit(croppedImage);
        }
      } catch (e) {
        enqueueSnackbar("Can't crop image", { variant: 'error' });
      }
    }
  }, [onSubmit, completedCrop, enqueueSnackbar]);

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="md">
      <DialogTitle className={classes.title}>
        <Typography variant="subtitle2">{'Select crop area'}</Typography>
        <IconButton onClick={onClose} color="primary" className={classes.closeButton}>
          <CloseIcon /> Cancel
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.cropContainer}>
        <ReactCrop
          className={classes.reactCrop}
          keepSelection
          src={fileUrl}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
          {...rest}
        />
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button
          color="primary"
          onClick={handleSubmit}
          data-cy="crop-submit"
          disabled={completedCrop.width === 0 || completedCrop.height === 0}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CropDialog;
