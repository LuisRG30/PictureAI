import React from "react";

const SearchBar = ({
  width = "full",
  placeholder = "Search Here",
  isImage = true,
  onClick,
  searchInput,
  setSearchInput,
}) => {
  const searchBarClasses = `relative bg-black rounded-full md:h-auto h-full overflow-hidden
   w-${width} gradient-border max-w-[100%] md:max-w-[460px]`;
  const inputClasses =
    "w-full h-10 px-10 py-6 pr-[70px] border-none outline-none text-white bg-black gradient-border";
  const iconContainerClasses =
    "absolute right-9 top-1/2 transform -translate-y-1/2";

  return (
    <div className={searchBarClasses}>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => {
          setSearchInput(e.target.value);
        }}
        className={inputClasses}
        placeholder={placeholder}
      />
      <div className={iconContainerClasses} onClick={onClick}>
        {isImage ? (
          <img
            src="/assets/svgs/arrow-circle.svg"
            alt="Search Icon"
            className="cursor-pointer"
          />
        ) : (
          <button className="cursor-pointer text-white" onClick={onClick}>Search</button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
