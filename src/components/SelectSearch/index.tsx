"use client";
import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  selected: any;
  setSelected: (value: any) => void;
  data: any;
  setData: (value: any) => void;
  inputValue: any;
  setInputValue: (value: any) => void;
  selectedSearchId: any;
  setSelectedSearchId: any;
}
const Selector = ({
  open,
  setOpen,
  selected,
  setSelected,
  data,
  setData,
  inputValue,
  setInputValue,
  selectedSearchId,
  setSelectedSearchId,
}: Props) => {
  const handleCheckboxChange = (item: any) => {
    if (selected.includes(item.name)) {
      setSelected(selected.filter((name: any) => name !== item.name)); // Bỏ chọn
    } else {
      setSelected([...selected, item.name]); // Chọn
    }
    if (selectedSearchId.includes(item._id)) {
        setSelectedSearchId(selectedSearchId.filter((id: any) => id !== item._id)); // Bỏ chọn
      } else {
        setSelectedSearchId([...selectedSearchId, item._id]); // Chọn
      }
  };

  return (
    <div className="w-full font-medium h-80">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${
          selected.length === 0 && "text-gray-700"
        }`}
      >
        {selected.length > 0 ? selected.join(", ") : "Select Countries"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter country name"
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
        {data?.map((item: any) => (
          <li
            key={item?.name}
            className={`p-2 text-sm flex items-center hover:bg-sky-600 hover:text-white ${
              selected.includes(item?.name) && "bg-sky-600 text-white"
            } ${
              item?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => handleCheckboxChange(item)}
          >
            <input
              type="checkbox"
              checked={selected.includes(item?.name)}
              onChange={() => handleCheckboxChange(item)}
              className="mr-2"
            />
            {item?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;
