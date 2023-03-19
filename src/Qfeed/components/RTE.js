import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RTF({ value, onChange, placeholder }) {
  const modules = {
    toolbar: [
      [
        "bold",
        "italic",
        //   "underline",
        //   "strike"
      ], // basic text formatting
      [{ list: "ordered" }, { list: "bullet" }], // numbered and bullet lists
      //   [{ indent: "-1" }, { indent: "+1" }], // left and right indentation
      //   [{ align: [] }], // text alignment
      ["link"], // insert links
      // Commented out the following line to disable inserting images and videos
      // ['image', 'video'],  // insert images and videos
      //   ["clean"], // remove formatting
    ],
  };

  return (
    <div style={{ marginBottom: ".5rem" }} className="RTE">
      <ReactQuill
        modules={modules}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
