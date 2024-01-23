import { Button, ImageGallery, UploadImage, Modal } from "@/src/components";
import { Genres, NotifyModal } from "@/src/sections";
import TermsModal from "@/src/sections/TermsModal";
import {
  selectFilters,
  selectUploadedImage,
  setUploadedImage,
  removeFilteredImagesById,
  setFilteredImages,
} from "@/src/store/images/imagesSlice";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UploadImagePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { filters, uploadImage, filteredImages, error } = useSelector(
    (state) => state.images
  );
  const [isSelectedFilter, setIsSelectedFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [isOpenTermsModal, setIsOpenTermsModal] = useState(false);

  const handleOpenImageModal = () => {
    setIsOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setIsOpenImageModal(false);
  };

  useEffect(() => {
    const newSelectedFilters = Object.keys(filters)
      .filter((key) => filters[key].selected)
      .map((key) => filters[key]);
    setSelectedFilters(newSelectedFilters);

    dispatch(setFilteredImages(newSelectedFilters));
  }, [uploadImage, filters]);

  return (
    <div className={`${!isSelectedFilter && "xPaddings"} relative`}>
      <div className="mx-auto flex md:flex-row flex-col justify-between gap-2 max-width">
        <div className="w-full md:px-0 xPaddings">
          <div className={"flex w-full h-full justify-center"}>
            <div className="flex flex-col min-w-[400px] w-full items-center gap-6">
              <UploadImage
                image={uploadImage}
                setUploadedImage={(img) => {
                  dispatch(setUploadedImage(img));
                  handleOpenImageModal();
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
                  onClick={() => {
                    setIsOpenImageModal(true);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImagePage;
