import React, { useState } from "react";

const Dropdown = ({ options, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="border border-gray-500 bg-transparent text-white
         rounded-3xl md:px-4 px-3 md:py-2 py-1 items-center w-full flex 
         justify-between"
      >
        <span
          className={`mr-2 ${
            selectedOption === null ? "text-[#6B7280]" : "text-white"
          }`}
        >
          {selectedOption ? selectedOption : placeholder}
        </span>
        <img
          src="assets/images/down-arrow.png"
          alt="Arrow Down"
          className="h-4 w-4"
        />
      </button>

      {isDropdownOpen && (
        <div
          className="absolute top-full left-0 w-full
         bg-black rounded-md mt-1 z-10"
        >
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 cursor-pointer
               text-white text-[15px]"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { Dropdown };
