"use client";
import { cn } from "@/lib/utils";
import { useState, useEffect, forwardRef } from "react";
import { EditorState, ContentState } from "draft-js";
//import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false },
);

interface EditorProps {
  initialContent?: string;
  editorClassName?: string;
  onChange?: (editorState: any) => void;
}

export default forwardRef(function TextEditor(
  { initialContent, ...props }: EditorProps,
  ref,
) {
  const [editorState, setEditorState] = useState(() => {
    const contentState = initialContent
      ? ContentState.createFromText(initialContent)
      : ContentState.createFromText("");
    return EditorState.createWithContent(contentState);
  });

  const onEditorStateChange = (newEditorState: any) => {
    setEditorState(newEditorState);
  };

  return (
    <Editor
      editorClassName={cn(
        "border-2 border-solid border-custom-primary px-3 min-h-[350px] cursor-text ",
        props.editorClassName,
      )}
      toolbar={{
        options: ["inline", "list", "link", "history"],
        inline: {
          options: ["bold", "italic", "underline"],
        },
      }}
      editorState={editorState} // Pass the editorState prop
      onEditorStateChange={onEditorStateChange} // Handle changes to editorState
      editorRef={(r) => {
        if (typeof ref === "function") {
          ref(r);
        } else if (ref) {
          ref.current = r;
        }
      }}
      {...props}
    />
  );
});
