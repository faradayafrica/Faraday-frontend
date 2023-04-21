import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/QuestionRTE.css";

const QuestionRTE = React.forwardRef(
  ({ value, onChange, placeholder }, ref) => {
    const modules = {
      toolbar: [
        ["bold", "italic", "link"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["code-block"],
      ],
    };

    return (
      <div style={{ marginBottom: ".5rem" }} className="RTE questionQTE">
        <ReactQuill
          ref={ref}
          modules={modules}
          theme="snow"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
);

export default QuestionRTE;
