import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useSnackbar } from 'notistack';
import { Crop } from 'react-image-crop';
import CropDialog from '../CropDialog';
import ImageInput from './ImageInput';
import ImageInputButton from './ImageInputButton';
import { BlobWithName } from '../../types/common';
import { getFileWithUniqueName } from '../../helpers/common';
import { getMomentFormattedDateNow } from '../../helpers/momentFormat';
import { generatePutUrl } from '../../api/awsApi';

interface IProps {
  asButton?: boolean;
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
      const image = new Image();
      const file = e.target.files[0];

      image.onload = () => {
        if (image.width < 200 || image.height < 250) {
          enqueueSnackbar('Minimal image size is 200x250 pixels.', { variant: 'error' });

          return;
        }

        setFileForUpload(image.src);
        setIsCropDialogOpen(true);
      };

      if (withCropper) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          const result = reader.result as string;
          image.src = result;
        });

        reader.readAsDataURL(file);
      } else {
        const uploadFile = getFileWithUniqueName(file);

        await handleUpload(uploadFile);
      }
    }
  };

  const acceptedFiles = withCropper ? 'image/jpeg, image/png' : 'image/*';

  return (
    <>
      {(!value && (
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
      )) ||
        (value && (
          <ImageInputButton
            isUploading={isUploading}
            inputId={inputId}
            disabled={disabled}
            acceptedFiles={acceptedFiles}
            handleFileSelect={handleFileSelect}
            inputValue={inputValue}
          />
        ))}
      {/* <CropDialog
        fileUrl={fileForUpload}
        isOpen={isCropDialogOpen}
        onClose={() => setIsCropDialogOpen(false)}
        onSubmit={handleUpload}
        // cropSetting={cropSettings}
      /> */}
    </>
  );
};

export default ImageUpload;
