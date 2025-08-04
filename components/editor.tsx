"use client";

import { useState } from "react";
import MDEditor from '@uiw/react-md-editor';

export default function Editor() {
  const [value, setValue] = useState("**Hello world!!!**");

  return (
    <div data-color-mode="light">
      <MDEditor
        height={`calc(100vh - 120px)`}
        value={value}
        onChange={(val) => setValue(val || "")}
        className="flex-grow"
        previewOptions={{
          style: { whiteSpace: 'pre-wrap' }
        }}
      />
    </div>
  );
}