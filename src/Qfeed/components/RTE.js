import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RTF({ value, onChange, placeholder }) {
  const modules = {
    toolbar: [
      ["bold", "italic", "link"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code-block"],
    ],
  };

  return (
    <div style={{ marginBottom: ".5rem" }} className="RTE">
      <ReactQuill
        modules={modules}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
