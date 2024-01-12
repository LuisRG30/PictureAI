import { Button, ImageGallery, UploadImage } from "@/src/components";
import { Genres } from "@/src/sections";
import {
  selectFilters,
  selectUploadedImage,
  setUploadedImage,
  removeFilteredImagesById,
  setFilteredImages,
} from "@/src/store/imagesSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const { filters, uploadImage, filteredImages } = useSelector(
    (state) => state.images
  );
  const [isSelectedFilter, setIsSelectedFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const stylesSelectionBox = {
    //width:'45%',
    background: "rgba(222, 41, 226, 0.08)",
  };

  useEffect(() => {
    setIsSelectedFilter(
      Object.values(filters).some((value) => value.isChecked === true)
    );
    const newSelectedFilters = Object.keys(filters)
      .filter((key) => filters[key].isChecked)
      .map((key) => filters[key]);
    setSelectedFilters(newSelectedFilters);
  }, [filters]);

  useEffect(() => {
    const newSelectedFilters = Object.keys(filters)
      .filter((key) => filters[key].isChecked)
      .map((key) => filters[key]);
    setSelectedFilters(newSelectedFilters);

    dispatch(setFilteredImages(newSelectedFilters));
  }, [uploadImage, filters]);

  return (
    <div className={`${!isSelectedFilter && "xPaddings"} relative`}>
      <div className="mx-auto flex md:flex-row flex-col justify-between gap-2 max-width">
        <div
          className={`flex-none w-[45%]  ${isSelectedFilter && "xPaddings"}`}
          style={isSelectedFilter ? stylesSelectionBox : {}}
        >
          <Genres
            filters={filters}
            selectedFilters={selectedFilters}
            isSelectedFilter={isSelectedFilter}
          />
        </div>

        {isSelectedFilter && (
          <div className="md:w-[55%] w-full md:px-0 xPaddings">
            <div className={"flex w-full h-full justify-center"}>
              <div className="flex flex-col min-w-[400px] w-full items-center gap-6">
                <UploadImage
                  image={uploadImage}
                  setUploadedImage={(img) => {
                    dispatch(setUploadedImage(img));
                  }}
                  clearUploadedImage={() => {
                    dispatch(setUploadedImage(null));
                    dispatch(setFilteredImages([]));
                  }}
                />

                <ImageGallery
                  ImageSources={filteredImages}
                  isRemoveEnabled={true}
                  handleRemoveImage={(id) => {
                    dispatch(removeFilteredImagesById(id));
                  }}
                />
                <div className="w-full">
                  <Button
                    text={"Checkout"}
                    styles={{
                      background:
                        "linear-gradient(90deg, #E85EFF 0%, #6843EC 108.39%)",
                      minWidth: "100%",
                      border: "1px solid white",
                    }}
                    onClick={() =>{}}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;