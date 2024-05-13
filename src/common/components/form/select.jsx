import { Combobox } from "@headlessui/react";
import React from "react";
import "../../styles/select.css";
import { IoIosArrowDown } from "react-icons/io";

const Select = ({
  name,
  label,
  options,
  error,
  register,
  signup,
  value,
  setValue,
  lists,
  loading,
  disabled,
  optionClick,
  loadingMsg = "Loading...",
  setQuery,
  ...rest
}) => {
  if (signup) {
    return (
      <Combobox
        value={value}
        onChange={setValue}
        name="school"
        disabled={disabled}
      >
        <div className="relative mt-3">
          <div>
            <Combobox.Button as="div" className="w-full">
              <Combobox.Label hidden> {label}</Combobox.Label>
              <Combobox.Input
                placeholder={label}
                onChange={(event) => setQuery(event.target.value)}
                className="form-control truncate relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm"
              />
              {/* <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'> */}
              <button className="absolute inset-y-0 right-0 flex items-center pr-2 ">
                <ChevronUpDown />
              </button>
              {/* </span> */}
            </Combobox.Button>
          </div>

          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30 bg-white select-dropdown">
            {lists?.map((list) => (
              <Combobox.Option
                key={list.id}
                className={({ active }) =>
                  `relative cursor-default select-none py-[12px] px-4 hover:bg-gray-100 select-list ${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-900"
                  }`
                }
                onClick={() => optionClick(list, label)}
                onKeyDown={(e) => optionClick(list, label, e)}
                value={list.name}
              >
                {({ selected }) => (
                  <span
                    className={`block  ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {list.name}
                  </span>
                )}
              </Combobox.Option>
            ))}
            {loading && (
              <Combobox.Option className="py-3">{loadingMsg}</Combobox.Option>
            )}
            {!loading && lists?.length === 0 && (
              <Combobox.Option className="py-3">
                Sorry, No {label} found!
              </Combobox.Option>
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    );
  }
  return (
    <div className="form-group log">
      <label className="sr-only" htmlFor={name}>
        {label}
      </label>
      <select
        name={name}
        id={name}
        {...rest}
        className="w-[8rem]  p-2 rounded-lg"
        placeholder={name}
      >
        {/* <option value=' ' /> */}
        <option value>{label}</option>
        {options.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
      {error && (
        <div className="alert alert-warning my-1 ">
          <div className="dialog-arrow alert-warning"> </div>{" "}
          <p className="m-0 alert-body">{error}</p>{" "}
        </div>
      )}
    </div>
  );
};

export default Select;

const ChevronUpDown = ({ ...rest }) => {
  return <IoIosArrowDown className="text-[#9DA1A7] font-semibold" size={20} />;
};
