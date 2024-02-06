import React, { useState } from "react";
import { ImageGallery } from "../components";

export default function FiltersSidebar({
  handleSelectedGender,
  genders,
  tiers,
  handleSelectedTier,
  handleCloseFilter,
  selectedFilters,
  handleImageSelection,
  // handleToggleFilter,
}) {
  const gradientStyle = {
    background: "linear-gradient(180deg, rgba(222, 41, 226, 0.08) 0%, rgba(222, 41, 226, 0.00) 100%)",
  };

  const [isGenderVisible, setIsGenderVisisble] = useState(true);
  const [isTierVisible, setIsTierVisisble] = useState(true);

  const toogleGender = () => {
    setIsGenderVisisble(!isGenderVisible);
  };
  const toogleTier = () => {
    setIsTierVisisble(!isTierVisible);
  };

  return (
    <div
      className="mt-5 w-80 h-[662px] overflow-x-hidden space-y-3 overflow-auto
      scroll-container p-5"
      style={gradientStyle}
    >
      <div className=" h-10 flex justify-between border-b-[1.5px] border-[#22192c]">
        <p className=" text-base font-normal text-white">Filter</p>
        <img
          src={"assets/images/logout.png"}
          alt="logout"
          className="w-6 h-6 ml-2 inline-block cursor-pointer"
          onClick={handleCloseFilter}
        />
      </div>
      {/* gendar selection */}
      <div className="  flex flex-col justify-between ">
        <div className="h-8  flex justify-between">
          <p className=" text-base font-normal text-white">Gender</p>
          <img
            src={!isGenderVisible ? "assets/images/arrow.png" : "assets/images/down-arrow.png"}
            alt="dropdown"
            className="w-6 h-6 ml-2 inline-block cursor-pointer"
            onClick={toogleGender}
          />
        </div>
        <div className={`w-full ${isGenderVisible ? "flex" : "hidden"} gap-x-3 gap-y-3 py-5 flex-wrap`}>
          {genders?.map((item, key) => (
            <div
              className={`py-2 px-4 justify-center rounded-[45px] items-center flex text-white cursor-pointer ${
                item?.selected
                  ? "border-2 border-white bg-[#370838] "
                  : " bg-transparent border-[2px] border-[#374151] rounded-md"
              }`}
              key={key}
              onClick={() => {
                handleSelectedGender(item);
              }}
            >
              {item.value}
            </div>
          ))}
        </div>
      </div>
      {/* Tier selection */}
      <div className="  flex flex-col justify-between  w-full ">
        <div className="h-10  flex justify-between">
          <p className=" text-base font-normal text-white">Tier</p>
          <img
            src={!isTierVisible ? "assets/images/arrow.png" : "assets/images/down-arrow.png"}
            alt="dropdown"
            className="w-6 h-6 ml-2 inline-block cursor-pointer"
            onClick={toogleTier}
          />
        </div>
        <div className={`w-full  ${isTierVisible ? "flex" : "hidden"} gap-3 py-5 flex-wrap`}>
          {tiers?.map((item, key) => (
            <div
              className={`py-2 px-4 justify-center rounded-[45px] items-center flex text-white cursor-pointer ${
                item.selected
                  ? "border-2 border-white bg-[#370838] "
                  : " bg-transparent border-[2px] border-[#374151] rounded-md"
              }`}
              onClick={() => {
                handleSelectedTier(item);
              }}
              key={key}
            >
              {item.value}
            </div>
          ))}
        </div>
      </div>
      <div className="border-b-2 py-2 border-[#828082] text-[#828082] text-sm">
        Selected images would be shown here.
      </div>
      {/* Image selection */}

      <div className="pt-4">
        <ImageGallery
          ImageSources={selectedFilters}
          isSelectionDisabled={false}
          isSelectedImage={true}
          handleImageSelection={handleImageSelection}
        />
      </div>
    </div>
  );
}
