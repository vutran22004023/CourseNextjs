import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setImagePreview(URL.createObjectURL(file));
    onImageUpload(file);
  }, [onImageUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
  });

  return (
    <div>
      <div {...getRootProps({ className: "dropzone cursor-pointer w-[100px]" })}>
        <input {...getInputProps()} />
        <p className="p-2 bg-black text-[#fff] w-[100px] cursor-pointer rounded-md">Thêm ảnh</p>
      </div>
    </div>
  );
};

export default ImageUpload;
