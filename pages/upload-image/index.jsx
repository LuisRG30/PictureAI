import { Button, ImageGallery, UploadImage, Modal } from "@/src/components";
import { Preferences } from "@/src/components/Preferences";
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

const UploadImagePage = ({selectedFilters}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { filters, uploadImage, filteredImages, error } = useSelector(
    (state) => state.images
  );
  const [isSelectedFilter, setIsSelectedFilter] = useState(false);
  // const [selectedFilters, setSelectedFilters] = useState([]);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [isOpenTermsModal, setIsOpenTermsModal] = useState(false);
  const [gender, setGender] = useState(null);

  const [hairColors, setHairColors] = useState([]);

  const [varyFacialHair, setVaryFacialHair] = useState(null);

  const handleOpenImageModal = () => {
    setIsOpenImageModal(true);
  };

  const handleCloseImageModal = () => {
    setIsOpenImageModal(false);
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

  // useEffect(() => {
  //   const newSelectedFilters = Object.keys(filters)
  //     .filter((key) => filters[key].selected)
  //     .map((key) => filters[key]);
  //   setSelectedFilters(newSelectedFilters);

  //   dispatch(setFilteredImages(newSelectedFilters));
  // }, [uploadImage, filters]);

  const sendOrderInfo = async () => {
    const selectedProducts = selectedFilters;
    const formData = new FormData();
    formData.append('image', uploadImage);
    formData.append('products', JSON.stringify(selectedProducts));
    formData.append('gender', gender);
    formData.append('hairColors', JSON.stringify(hairColors));
    formData.append('varyFacialHair', JSON.stringify(varyFacialHair));
    console.log("formdata", selectedProducts,uploadImage,gender,hairColors,varyFacialHair)
    // const response = await axios.post('/api/checkout_sessions', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // });
    // const session = await response.data;
    // const stripe = await stripePromise;
    // const { error } = await stripe.redirectToCheckout({
    //   sessionId: session.id,
    // });
    // console.log(error.message);
  }

  return (
    <div className={`${!isSelectedFilter && "xPaddings"} relative`}>
      <div className="mx-auto flex md:flex-row flex-col justify-between gap-2 max-width">
        <div className="w-full md:px-0 xPaddings">
          <div className={"flex w-full h-full justify-center"}>
            <div className="flex flex-col min-w-[400px] w-full items-center gap-6">
              <UploadImage
                image={uploadImage}
                setUploadedImage={(img) => {
                  console.log("uploaded img", img)
                  dispatch(setUploadedImage(img));
                  handleOpenImageModal();
                }}
                clearUploadedImage={() => {
                  dispatch(setUploadedImage(null));
                  dispatch(setFilteredImages([]));
                }}
              />

              {/* <ImageGallery
                ImageSources={filteredImages}
                isRemoveEnabled={true}
                handleRemoveImage={(id) => {
                  dispatch(removeFilteredImagesById(id));
                }}
              /> */}

              <Preferences
                setGender={setGender}
                toggleSelectHairColor={toggleSelectHairColor}
                setVaryFacialHair={setVaryFacialHair}
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
                    sendOrderInfo();
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
