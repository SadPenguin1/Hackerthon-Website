import React from "react";
// etc

import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setBody } from "src/redux/slices/hackerthon/hackerthon.answer";
import Scrollbar from "src/components/Scrollbar";

// const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });
const MonacoEditor = dynamic(import("@monaco-editor/react"), { ssr: false });
// const MonacoEditor = dynamic(import("monaco-editor-webpack-plugin"), { ssr: false });
export function Monaco({ postBody, setPostBody }) {

  return (
    // <Scrollbar sx={{ flexGrow: 1 }}>
    <MonacoEditor
      editorDidMount={() => {
        // @ts-ignore
        window.MonacoEnvironment.getWorkerUrl = (
          _moduleId,
          label
        ) => {
          if (label === "json")
            return "_next/static/json.worker.js";
          if (label === "css")
            return "_next/static/css.worker.js";
          if (label === "html")
            return "_next/static/html.worker.js";
          if (
            label === "typescript" ||
            label === "javascript"
          )
            return "_next/static/ts.worker.js";
          return "_next/static/editor.worker.js";
        };
      }}
      //width="800"
      // height="600"
      language="javascript"
      theme="vs-light"
      value={postBody}
      options={{
        minimap: {
          enabled: true
        }
      }}
      onChange={setPostBody}
    />
    // </Scrollbar>

  )
}