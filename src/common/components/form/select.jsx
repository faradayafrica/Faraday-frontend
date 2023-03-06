import { Listbox } from "@headlessui/react";
import React from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";
import searchIcon from "../../assets/search.svg";

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
  ...rest
}) => {
  if (signup) {
    return (
      <Listbox
        value={value}
        onChange={setValue}
        name="school"
        disabled={disabled}
      >
        <div className="relative mt-3">
          <Listbox.Label hidden> {label}</Listbox.Label>
          <Listbox.Button className="form-control truncate relative w-full cursor-default rounded-lg py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm">
            {value ? value : <span className="text-gray-400">{label}</span>}

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ArrowDown />
            </span>
          </Listbox.Button>

          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-30 bg-white select-dropdown">
            {lists?.map((list) => (
              <Listbox.Option
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
              </Listbox.Option>
            ))}
            {loading && (
              <Listbox.Option className="py-3">{loadingMsg}</Listbox.Option>
            )}
            {!loading && lists?.length === 0 && (
              <Listbox.Option className="py-3">
                Sorry, No {label} found!
              </Listbox.Option>
            )}
          </Listbox.Options>
        </div>
      </Listbox>
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
        className="form-control "
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

const ArrowDown = ({ ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};
