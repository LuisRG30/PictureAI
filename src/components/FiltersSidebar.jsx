import React from "react";
import { ImageGallery } from "../components";
import { Gendar, Tiers } from "../utils/mockdata";

export default function FiltersSidebar({
  setGendarSelected,
  gendarSelected,
  selectedTiers,
  handleSelectedTier,
  selectedFilters,
  handleToggleFilter,
}) {
  const gradientStyle = {
    background:
      "linear-gradient(180deg, rgba(222, 41, 226, 0.08) 0%, rgba(222, 41, 226, 0.00) 100%)",
  };

  return (
    <div
      className=" w-96 h-[662px] p-2 overflow-x-hidden overflow-y-scroll space-y-3"
      style={gradientStyle}
    >
      <div className=" h-10 flex justify-between border-b-[1.5px] border-[#22192c]">
        <p className=" text-base font-normal text-white">Filter</p>
        <img
          src={"assets/images/logout.png"}
          alt="logout"
          className="w-6 h-6 ml-2 inline-block"
        />
      </div>
      {/* gendar selection */}
      <div className="  flex flex-col justify-between ">
        <div className="h-10  flex justify-between">
          <p className=" text-base font-normal text-white">Genres</p>
          <img
            src={"assets/images/arrow.png"}
            alt="dropdown"
            className="w-6 h-6 ml-2 inline-block cursor-pointer"
          />
        </div>
        <div className="w-full flex gap-x-2 py-5">
          {Gendar?.map((item, key) => (
            <div
              className={`py-2 px-4 justify-center rounded-[45px] items-center flex text-white cursor-pointer ${
                gendarSelected === item
                  ? "border-2 border-white bg-[#370838] "
                  : " bg-transparent border-[2px] border-[#374151] rounded-md"
              }`}
              onClick={() => {
                setGendarSelected(item);
              }}
            >
              {" "}
              {item}
            </div>
          ))}
        </div>
      </div>
      {/* Tier selection */}
      <div className="  flex flex-col justify-between  w-full ">
        <div className="h-10  flex justify-between">
          <p className=" text-base font-normal text-white">Tier</p>
          <img
            src={"assets/images/arrow.png"}
            alt="dropdown"
            className="w-6 h-6 ml-2 inline-block cursor-pointer"
          />
        </div>
        <div className="w-full flex gap-3 py-5 flex-wrap ">
          {Tiers?.map((item, key) => (
            <div
              className={`py-2 px-4 justify-center rounded-[45px] items-center flex text-white cursor-pointer ${
                selectedTiers.includes(item)
                  ? "border-2 border-white bg-[#370838] "
                  : " bg-transparent border-[2px] border-[#374151] rounded-md"
              }`}
              onClick={() => {
                handleSelectedTier(item);
              }}
            >
              {" "}
              {item}
            </div>
          ))}
        </div>
      </div>
      <div className="border-b-2 border-[#828082] text-[#828082] text-base">
        Selected images would be shown here.
      </div>
      {/* Image selection */}

      <ImageGallery
        ImageSources={selectedFilters}
        handleImageSelection={handleToggleFilter}
        isSelectedImage={false}
        isFilterBar={true}
      />
    </div>
  );
}
