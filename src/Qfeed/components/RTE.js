import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PrimaryButton from "../../common/components/PrimaryButton";

export default function RTE({ value, onChange, placeholder, submit }) {
  const modules = {
    toolbar: [
      ["bold", "italic", "link"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code-block"],
    ],
  };

  const sendComment = () => {
    console.log("Submit");
    submit();
  };

  return (
    <div style={{ marginBottom: ".5rem" }} className="RTE relative">
      <ReactQuill
        modules={modules}
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      <div className="absolute bottom-2 right-2">
        <PrimaryButton cta="Submit" action={sendComment} variant="small" />
      </div>
    </div>
  );
}
