"use client";
import React, { useState, useEffect } from "react";
import {
    ContentState,
    EditorState,
    convertFromHTML,
    convertToRaw,
} from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "setimmediate";
import { Input } from "@/components/ui/input";
import ButtonComponent from "@/components/Button/Button";
import { useMutationHook } from "@/hooks";
import { RootState } from "@/redux/store";
import { CreateBlogs } from "@/apis/blog";
import { useSelector, useDispatch } from "react-redux";
import { success, error } from "@/components/Message/Message";
import useScreenWindow from "@/hooks/useScreenWindow";
import { ImageUpload, FileUpload,VideoUpload } from "@/components/UpLoadImg/ImageUpload";
import Image from "next/image";
import {useFirebaseStorage} from "@/hooks/useFirebaseStorage";
export default function PostsBlog() {
    const user = useSelector((state: RootState) => state.user);
    const note = {
        id: "9999",
        content: "<p></p>",
    };
    const [imagePreview, setImagePreview] = useState<string>();
    const[fileImage, setFileImage] = useState<File>();

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const [rawHTML, setRawHTML] = useState(note.content);
    const [valueHeader, setValueHeader] = useState<string>();
    const [isMounted, setIsMounted] = useState(false);

    const {
        uploadedFiles,
        uploadFile,
        setUploadedFiles,
        deleteFileFromFirebase,
    } = useFirebaseStorage();

    const handleImageUpload = (file: File) => {
        setImagePreview(URL.createObjectURL(file));
        setFileImage(file);
    };

    const { width: ScreenWidth, height:ScreenHeight } = useScreenWindow();
    useEffect(() => {
        setIsMounted(true);

        return () => {
            setIsMounted(false);
        };
    }, []);

    useEffect(() => {
        const blocksFromHTML = convertFromHTML(note.content);
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        if (isMounted) {
            setEditorState(EditorState.createWithContent(state));
        }
    }, [note.id, isMounted]);

    const handleOnChange = (e: EditorState) => {
        if (isMounted) {
            setEditorState(e);
            setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
        }
    };

    useEffect(() => {
        if (isMounted) {
            setRawHTML(note.content);
        }
    }, [note.content, isMounted]);

    const mutationBlog = useMutationHook(async (data) => {
        try {
            const res = await CreateBlogs(data);
            return res;
        } catch (e) {
            console.log(e);
        }
    });

    const handleButtonCreateBlog = async () => {
        if(imagePreview) {
            const url = await uploadFile(fileImage, "files/blogs");
            if(url) {
                await mutationBlog.mutate({ title: valueHeader, content: rawHTML, image: url });
            }
        }
    };

    const { data: dataBlog } = mutationBlog;
    useEffect(() => {
        if (dataBlog?.status === 200) {
            success(`${dataBlog.message}`);
            setImagePreview("");
            setFileImage(undefined);
            setValueHeader("");
            setRawHTML("");
            setUploadedFiles([]);
        } else if (dataBlog?.status === "ERR") {
            error(`${dataBlog.message}`);
            const deletePromises = uploadedFiles.map((fileUrl) =>
                deleteFileFromFirebase(fileUrl)
            );
            Promise.all(deletePromises)
                .then(() => {
                    console.log("All uploaded files deleted successfully.");
                    setUploadedFiles([]);
                })
                .catch((err) => console.error("Error while deleting files:", err));
        }
    }, [dataBlog]);

    return (
        <div className="container w-full p-4 shadow-xl rounded-lg">
            <div className=" mb-6 flex justify-between items-center">
                <div className="w-full] border-0">
                    <Input
                        className="p-3 w-full border-0 text-[30px]"
                        type="text"
                        placeholder="Tiêu đề"
                        value={valueHeader}
                        onChange={(e) => setValueHeader(e.target.value)}
                    />
                </div>
                <div>
                    <ButtonComponent
                        type="courseHeader"
                        className="p-2 justify-center flex"
                        onClick={handleButtonCreateBlog}
                        disabled={valueHeader?.length && rawHTML ? false : true}
                    >
                        Đăng bài
                    </ButtonComponent>
                </div>
            </div>
            <div className="mb-2">
                <ImageUpload onImageUpload={handleImageUpload} />
                {imagePreview && (
                    <Image src={imagePreview} alt="imagePreview" width={150} height={150} className="rounded-md mt-2" />
                )}
            </div>
            <div style={{height: ScreenHeight- 250,width: ScreenWidth - 300, overflowY: 'auto' }}>
                <Editor
                    editorState={editorState}
                    onEditorStateChange={handleOnChange}
                    placeholder="Nhập mô tả vào đây"
                />
            </div>
        </div>
    );
}
