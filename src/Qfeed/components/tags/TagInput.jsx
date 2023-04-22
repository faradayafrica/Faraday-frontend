import React from "react";

const TagsInput = React.forwardRef((props, ref) => {
  const [tags, setTags] = React.useState(props.tags);

  function removeSpaces(str) {
    return str.replace(/[A-Z,\s]+/g, function (match) {
      return match.toLowerCase().replace(/[\s,]/g, "");
    });
  }

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = (event) => {
    if (event.target.value !== "") {
      setTags([...tags, removeSpaces(event.target.value)]);
      props.selectedTags([...tags, removeSpaces(event.target.value)]);
      event.target.value = "";
    }
  };
  return (
    <div className={`${props?.from === "penned" ? "w-full" :  "tags-input bg-background " } `}>
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag shadow-s ">
            <span className="tag-title">{tag}</span>
            <span
              className="ml-[4px] cursor-pointer"
              onClick={() => removeTags(index)}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z"
                  fill="#212529"
                />
              </svg>
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        onKeyUp={(event) =>
          event.key === "Enter" || event.key === " " || event.key === ","
            ? addTags(event)
            : null
        }
        placeholder="Add tags here, press enter or space to add tags"
        className={`${props?.from === "penned" ? "" : "bg-background"} w-full`}
        ref={ref}
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            event.preventDefault();
            props.editorRef.current.focus();
          }
          if (event.shiftKey && event.key === "Enter") {
            props?.postQuestion();
          }
          if (event.key === "Backspace" && event.target.value === "") {
            removeTags(tags.length - 1);
          }
        }}
      />
    </div>
  );
});

export default TagsInput;
