import { Theme, CircularProgress, IconButton } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import CropDialog from '../CropDialog';
import axios from 'axios';
import { BlobWithName } from '../../types/common';
import { generatePutUrl } from '../../api/awsApi';
import { useAppContext } from '../../store';
import useApiRequest from '../../hooks/userApiRequest';
import { updateMe } from '../../api/userApi';
import { setUserData } from '../../store/actions';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { Crop } from 'react-image-crop';

const useStyles = makeStyles((theme: Theme) => ({
  uploadBtn: {
    position: 'absolute',
    backgroundColor: '#ffffff !important',
  },
  input: {
    visibility: 'hidden',
    width: 0,
    height: 0,
  },
  loader: {
    color: theme.palette.primary.main,
  },
  centered: {
    position: 'absolute',
    top: 'calc(50% - 20px)',
    left: 'calc(50% - 20px)',
  },
}));

function UploadProfileAvatar() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { dispatch } = useAppContext();
  const { requestFn: updateMeApi } = useApiRequest(updateMe, {
    showSuccessMessage: false,
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileForUpload, setFileForUpload] = useState('');
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);

  console.log(isCropDialogOpen);

  const imageMinValue = useMemo(
    () => ({
      height: 400,
      width: 850,
    }),
    []
  );

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const image = new Image();
      const file = e.target.files[0];

      image.onload = () => {
        setFileForUpload(image.src);
        setIsCropDialogOpen(true);
      };

      const reader = new FileReader();

      reader.addEventListener('load', () => {
        const result = reader.result as string;
        image.src = result;
      });

      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async (file: BlobWithName | File) => {
    const key = `user/bg-avatar/${file.name}`;

    setIsUploading(true);
    setIsCropDialogOpen(false);

    try {
      const { url } = await generatePutUrl({
        key,
        contentType: file.type,
      });

      await axios.request({
        method: 'PUT',
        url,
        data: file,
        onUploadProgress: (progressEvent) => {
          setUploadProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
        headers: {
          'Content-Type': file.type,
        },
      });

      const user = await updateMeApi({ args: { backgroundAvatar: key } });

      dispatch(setUserData(user));
    } catch (e) {
      console.log(e);

      enqueueSnackbar("Can't upload image", { variant: 'error' });
    }

    setFileForUpload('');
    setUploadProgress(0);
    setIsUploading(false);
  };

  const acceptedFiles = 'image/jpeg, image/png';

  const cropSettings: Crop = useMemo(
    () => ({
      unit: '%',
      width: 100,
      height: 50,
      aspect: 1,
      x: 0,
      y: 0,
    }),
    []
  );

  return (
    <>
      <IconButton className={classes.uploadBtn} component="label" disabled={isUploading}>
        <UpgradeIcon />
        <span className={classes.centered}>
          {isUploading && uploadProgress === 0 && (
            <CircularProgress className={classes.loader} size={40} />
          )}
        </span>
        <input
          type="file"
          className={classes.input}
          onChange={handleFileSelect}
          accept={acceptedFiles}
        />
      </IconButton>
      <CropDialog
        isOpen={isCropDialogOpen}
        fileUrl={fileForUpload}
        onClose={() => {
          setIsCropDialogOpen(false);
          setFileForUpload('');
        }}
        onSubmit={handleUpload}
        cropSettings={cropSettings}
        minHeight={imageMinValue.height}
        minWidth={imageMinValue.width}
        maxHeight={imageMinValue.height}
        maxWidth={imageMinValue.width}
      />
    </>
  );
}

export default UploadProfileAvatar;
