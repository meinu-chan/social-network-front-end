import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useSnackbar } from 'notistack';
import { Crop } from 'react-image-crop';
import CropDialog from '../CropDialog';
import ImageInput from './ImageInput';
import { BlobWithName } from '../../types/common';
import { getFileWithUniqueName } from '../../helpers/common';
import { getMomentFormattedDateNow } from '../../helpers/momentFormat';
import { generatePutUrl } from '../../api/awsApi';

interface IProps {
  folder: string;
  value?: string;
  onChange: (link: string) => void;
  variant?: 'small' | 'normal';
  withCropper?: boolean;
  isError?: boolean;
  disabled?: boolean;
  cropSettings?: Crop;
}

const ImageUpload = (props: IProps) => {
  const {
    onChange,
    value,
    folder,
    isError = false,
    disabled,
    withCropper = true,
    variant = 'normal',
    cropSettings,
  } = props;

  const { enqueueSnackbar } = useSnackbar();
  const inputId = useMemo(() => uuid(), []);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileForUpload, setFileForUpload] = useState('');
  const [isCropDialogOpen, setIsCropDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleUpload = async (file: BlobWithName | File) => {
    const key = `${folder}/${getMomentFormattedDateNow()}/${file.name}`;

    setIsUploading(true);
    setIsCropDialogOpen(false);

    if (value) {
      onChange('');
    }

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

      onChange(key);
    } catch (e) {
      console.log(e);

      enqueueSnackbar("Can't upload image", { variant: 'error' });
    }

    setFileForUpload('');
    setInputValue('');
    setIsUploading(false);
    setUploadProgress(0);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (withCropper) {
        const reader = new FileReader();

        reader.addEventListener('load', () => setFileForUpload(reader.result as string));
        reader.readAsDataURL(file);

        setIsCropDialogOpen(true);
      } else {
        const uploadFile = getFileWithUniqueName(file);

        await handleUpload(uploadFile);
      }
    }
  };

  const acceptedFiles = withCropper ? 'image/jpeg, image/png' : 'image/*';

  return (
    <>
      <ImageInput
        link={value}
        inputId={inputId}
        variant={variant}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        acceptedFiles={acceptedFiles}
        handleFileSelect={handleFileSelect}
        inputValue={inputValue}
        disabled={disabled}
        isError={isError}
      />
      <CropDialog
        fileUrl={fileForUpload}
        isOpen={isCropDialogOpen}
        onClose={() => setIsCropDialogOpen(false)}
        onSubmit={handleUpload}
        cropSetting={cropSettings}
      />
    </>
  );
};

export default ImageUpload;
