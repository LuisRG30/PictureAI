import { ImageGallery } from "@/src/components";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UploadImagePage from "../upload-image";
export default function Preview() {
  const { filters } = useSelector((state) => state.images);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const newSelectedFilters = Object.keys(filters)
      .filter((key) => filters[key].selected)
      .map((key) => filters[key]);
    setSelectedFilters(newSelectedFilters);
  }, [filters]);
  return (
    <div className="flex flex-col w-full py-4 gap-4 h-[100%]  justify-center items-center space-y-4">
      <p className=" text-[32px] font-bold text-center leading-4 text-white">
        Filters Selected
      </p>
      <div className="w-[50%] ">
        <ImageGallery
          ImageSources={selectedFilters}
          handleImageSelection={() => {
            console.log("heer");
          }}
          isSelectedImage={false}
          isFilterBar={true}
          isPreview={true}
        />
        <UploadImagePage />
      </div>
    </div>
  );
}
