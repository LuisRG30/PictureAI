import { ImageGallery, Loader } from "@/src/components";
import { UploadImagePreviewSection } from "@/src/sections";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Preview() {
  const { filters, isLoading } = useSelector((state) => state.images);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const newSelectedFilters = Object.keys(filters)
      .filter((key) => filters[key].selected)
      .map((key) => filters[key]);
    setSelectedFilters(newSelectedFilters);
  }, [filters]);

  return (
    <>
      {isLoading ? (
        <div className="w-full flex h-[550px] justify-center items-center overflow-auto">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col xPaddings relative w-full py-4 gap-4 h-[100%]  justify-center items-center space-y-4">
          <p className=" text-xl font-bold text-center leading-4 text-white">
            Filters Selected
          </p>
          <div className="md:w-[50%] w-full">
            <ImageGallery
              ImageSources={selectedFilters}
              handleImageSelection={() => {}}
              isSelectedImage={false}
              isFilterBar={true}
              isPreview={true}
            />
            <UploadImagePreviewSection selectedFilters={selectedFilters} />
          </div>
        </div>
      )}
    </>
  );
}
