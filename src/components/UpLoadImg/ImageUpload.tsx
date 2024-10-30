import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
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
          Thêm ảnh
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
          Thêm tệp
        </p>
      </div>
      {fileName && <p className="mt-2">{fileName}</p>}
    </div>
  );
};
