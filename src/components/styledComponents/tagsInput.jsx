import React from 'react';

const TagsInput = props => {
  const [tags, setTags] = React.useState(props.tags);
  const removeTags = indexToRemove => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = event => {
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };
  return (
    <div className='tags-input mr-2'>
      <ul id='tags'>
        {tags.map((tag, index) => (
          <li key={index} className='tag'>
            <span className='tag-title'>{tag}</span>
            <span className='tag-close-icon' onClick={() => removeTags(index)}>
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41L17.59 5Z'
                  fill='#212529'
                />
              </svg>
            </span>
          </li>
        ))}
      </ul>
      <input
        type='text'
        onKeyUp={event => (event.key === 'Enter' ? addTags(event) : null)}
        placeholder='Press enter to add tags'
      />
    </div>
  );
};

export default TagsInput;
