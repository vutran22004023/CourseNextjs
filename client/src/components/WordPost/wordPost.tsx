import { useState, useEffect } from "react";
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

export default function wordPost() {
  const note = {
    id: "9999",
    content: "<p></p>",
  };

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [rawHTML, setRawHTML] = useState(note.content);
  const [isMounted, setIsMounted] = useState(false);

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
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleOnChange}
      placeholder="Nhập mô tả vào đây"
      editorStyle={{ maxWidth: "100%", width: 600 }}
    />
  );
}