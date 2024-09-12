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

interface Props {
  rawHTML: string;
  setRawHTML: (data: string) => void;
}

export default function wordPost({ rawHTML, setRawHTML }: Props) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(rawHTML);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    if (isMounted) {
      setEditorState(EditorState.createWithContent(state));
    }
  }, [rawHTML, isMounted]);

  const handleOnChange = (e: EditorState) => {
    if (isMounted) {
      setEditorState(e);
      setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())));
    }
  };

  useEffect(() => {
    if (isMounted) {
      setRawHTML(rawHTML);
    }
  }, [rawHTML, isMounted]);
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Nhập mô tả vào đây"
      editorStyle={{ maxWidth: "100%", width: 600 }}
    />
  );
}
