"use client"
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {useTranslation} from "react-i18next";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}
export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
    const {t} = useTranslation('common');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      const file = acceptedFiles[0];
      setImagePreview(URL.createObjectURL(file));
      onImageUpload(file);
    },
    [onImageUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div>
      <div
        {...getRootProps({ className: "dropzone cursor-pointer w-[100px]" })}
      >
        <input {...getInputProps()} />
        <p className="p-2 bg-[#FF5A00] text-[#fff] w-[100px] cursor-pointer rounded-md flex justify-center">
            {t('AddImage')}
        </p>
      </div>
    </div>
  );
};

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [fileName, setFileName] = useState<string | null>(null);
    const {t} = useTranslation('common');
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setFileName(file.name);
      onFileUpload(file);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [],
    },
  });

  return (
    <div>
      <div
        {...getRootProps({ className: "dropzone cursor-pointer w-[100px]" })}
      >
        <input {...getInputProps()} />
        <p className="p-2 bg-black text-[#fff] w-[100px] cursor-pointer rounded-md flex justify-center">
            {t('AddFile')}
        </p>
      </div>
      {fileName && <p className="mt-2">{fileName}</p>}
    </div>
  );
};

interface VideoUploadProps {
    onVideoUpload: (file: File) => void;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ onVideoUpload }) => {
    const { t } = useTranslation('common');
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const [videoName, setVideoName] = useState<string | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const file = acceptedFiles[0];
            setVideoName(file.name);
            setVideoPreview(URL.createObjectURL(file));
            onVideoUpload(file);
        },
        [onVideoUpload]
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "video/*": [] },
    });

    return (
        <div>
            <div
                {...getRootProps({ className: "dropzone cursor-pointer w-[100px]" })}
            >
                <input {...getInputProps()} />
                <p className="p-2 bg-blue-500 text-white w-[100px] cursor-pointer rounded-md flex justify-center">
                    {t('AddVideo')}
                </p>
            </div>
            {videoName && <p className="mt-2">{videoName}</p>}
            {videoPreview && (
                <video className="mt-2" width="200" controls>
                    <source src={videoPreview} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}
        </div>
    );
};
