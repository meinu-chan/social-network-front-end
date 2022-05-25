import { IconButton, Theme, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';
import CropDialog from '../CropDialog';
import axios from 'axios';
import { BlobWithName } from '../../types/common';
import { generatePutUrl } from '../../api/awsApi';
import { useAppContext } from '../../store';
import useApiRequest from '../../hooks/useApiRequest';
import { updateMe } from '../../api/userApi';
import { setUserData } from '../../store/actions';

const useStyles = makeStyles((theme: Theme) => ({
  updatePhoto: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: `${theme.palette.background.paper} !important`,
  },
  input: {
    visibility: 'hidden',
    width: 0,
    height: 0,
  },
  loader: {
    color: '#ffffff !important',
  },
  centered: {
    position: 'absolute',
    top: 'calc(50% - 20px)',
    left: 'calc(50% - 20px)',
  },
}));

function UploadAvatar() {
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
    const key = `user/avatar/${file.name}`;

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

      const user = await updateMeApi({ args: { photo: key } });

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

  return (
    <>
      <IconButton className={classes.updatePhoto} component="label" disabled={isUploading}>
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
        onClose={() => setIsCropDialogOpen(false)}
        onSubmit={handleUpload}
      />
    </>
  );
}

export default UploadAvatar;
