import { Button, ImageGallery, UploadImage, Modal } from "@/src/components";
import { Preferences } from "@/src/components/Preferences";
import { stripeCheckout, verifyFaceFromImage } from "@/src/store/images/imagesActions";
import {
  setUploadedImage,
  setFilteredImages,
  setError,
} from "@/src/store/images/imagesSlice";
import { getMappedProductsOfFilters } from "@/src/utils/filtersHelper";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { NotifyModal, TermsModal} from "@/src/sections";
import { useDispatch, useSelector } from "react-redux";

const UploadImagePreviewSection = ({ selectedFilters }) => {
  const dispatch = useDispatch();
  const { filters, uploadedImage, filteredImages, error, products } =
    useSelector((state) => state.images);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [gender, setGender] = useState(null);
  const [isOpenTermsModal, setIsOpenTermsModal] = useState(false);

  const [hairColors, setHairColors] = useState([]);

  const [varyFacialHair, setVaryFacialHair] = useState(null);

  const handleOpenImageModal = () => {
    //NOTE: You can uncomment this line when changes the face detection api URL in .env file
    // dispatch(verifyFaceFromImage(facesFormData));
    setIsOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setIsOpenImageModal(false);
  };

  const handleOpenTermsModal = () => {
    setIsOpenTermsModal(true);
  };

  const handleCloseTermsModal = () => {
    setIsOpenTermsModal(false);
  };

  const handleAgreePress = () => {
    handleCloseTermsModal();
    sendOrderInfo();
  };

  function toggleSelectHairColor(hairColor) {
    const updatedHairColors = [...hairColors];
    const index = updatedHairColors.indexOf(hairColor);
    if (index > -1) {
      updatedHairColors.splice(index, 1);
    } else {
      updatedHairColors.push(hairColor);
    }
    setHairColors(updatedHairColors);
  }

  const sendOrderInfo = async () => {
    if(isErrorInImages()){
      return false;
    }
    const selectedProducts = getMappedProductsOfFilters(
      selectedFilters,
      products
    );
    const formData = new FormData();
    formData.append("image", uploadedImage);
    formData.append("products", JSON.stringify(selectedProducts));
    formData.append("gender", gender);
    formData.append("hairColors", JSON.stringify(hairColors));
    formData.append("varyFacialHair", JSON.stringify(varyFacialHair));

    const facesFormData = new FormData();
    facesFormData.append('faces', uploadedImage);
    dispatch(stripeCheckout(formData));
  };

  const isErrorInImages = () => {
    if (!uploadedImage) {
      dispatch(setError({ message: "Please select an image" }));
      return true;
    }
    if(selectedFilters.length <= 0){
      dispatch(setError({ message: "Please select a filter for image" }));
      return true;
    }
    return false;
  }

  return (
    <div className={`xPaddings relative`}>
      <div className="mx-auto flex md:flex-row flex-col justify-between gap-2 max-width">
        <div className="w-full md:px-0 xPaddings">
          <div className={"flex w-full h-full justify-center"}>
            <div className="flex flex-col min-w-[400px] w-full items-center gap-6">
              <UploadImage
                image={uploadedImage}
                setUploadedImage={(img) => {
                  dispatch(setUploadedImage(img));
                  handleOpenImageModal();
                  dispatch(setError(null));
                }}
                clearUploadedImage={() => {
                  dispatch(setUploadedImage(null));
                  dispatch(setFilteredImages([]));
                  dispatch(setError(null));
                }}
              />

              {error && error.message && (
                <p className="text-[15px] text-red-500">
                  {error.message}
                </p>
              )}
              <Preferences
                setGender={setGender}
                toggleSelectHairColor={toggleSelectHairColor}
                setVaryFacialHair={setVaryFacialHair}
              />
              <div className="w-full md:px-0 px-5">
                <Button
                  text={"Checkout"}
                  styles={{
                    background:
                      "linear-gradient(90deg, #E85EFF 0%, #6843EC 108.39%)",
                    minWidth: "100%",
                    border: "1px solid white",
                  }}
                  onClick={() => {
                    if(isErrorInImages()){
                      return false;
                    }
                    handleOpenTermsModal();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <NotifyModal
          isOpen={isOpenImageModal}
          onClose={handleCloseImageModal}
          error={error}
          OnSuccess={handleCloseImageModal}
        />
        <TermsModal
          isOpen={isOpenTermsModal}
          onClose={handleCloseTermsModal}
          onAgree={handleAgreePress}
        />
    </div>
  );
};

export {UploadImagePreviewSection};
