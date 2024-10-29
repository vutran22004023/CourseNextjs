import { useState } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  getStorage,
} from "firebase/storage";
import { v4 } from "uuid";
import { imageDb } from "@/firebase/config";

const storage = getStorage(); // Khởi tạo storage

export const useFirebaseStorage = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  // Hàm tải lên tệp
  const uploadFile = async (file: File, path: string) => {
    try {
      const fileRef = ref(imageDb, `${path}/${v4()}`);
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setUploadedFiles((prev) => [...prev, url]);
      return url;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  // Hàm xóa tệp
  const deleteFileFromFirebase = async (imageUrl: string) => {
    try {
      const fileRef = ref(storage, imageUrl);
      await deleteObject(fileRef);
      console.log("Image deleted successfully");
      // Cập nhật lại state sau khi xóa
      setUploadedFiles((prev) => prev.filter((url) => url !== imageUrl));
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Trả về các hàm và state
  return {
    uploadedFiles,
    uploadFile,
    deleteFileFromFirebase,
    setUploadedFiles,
  };
};
