import axios from "axios";

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
import React, { useState, useEffect } from "react";
import { NotifyModal, TermsModal} from "@/src/sections";
import { useDispatch, useSelector } from "react-redux";

import DotLoader from "react-spinners/DotLoader";
import { hairColorMap } from "../utils/constants";

const UploadImagePreviewSection = ({ selectedFilters }) => {
  const dispatch = useDispatch();
  const { filters, uploadedImage, filteredImages, error, products } =
    useSelector((state) => state.images);
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [gender, setGender] = useState(null);
  const [isOpenTermsModal, setIsOpenTermsModal] = useState(false);

  const [hairColors, setHairColors] = useState([]);

  const [varyFacialHair, setVaryFacialHair] = useState(null);

  const [faceCount, setFaceCount] = useState(null);
  const [faceDetectionLoading, setFaceDetectionLoading] = useState(false);

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

  function produceResizedImageFile(file) {
    const DESIRED_FILE_SIZE = 1400000;
    if (file.size <= DESIRED_FILE_SIZE) {
      return Promise.resolve(file);
    }
    console.log("File size before resizing: ", file.size);
    console.log("Scaling factor: ", DESIRED_FILE_SIZE / file.size)
    console.log("File size after resizing: ", file.size * (DESIRED_FILE_SIZE / file.size));

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const elem = document.createElement("canvas");
          const scaleFactor = DESIRED_FILE_SIZE / file.size;
          elem.width = img.width * scaleFactor;
          elem.height = img.height * scaleFactor;
          const ctx = elem.getContext("2d");
          ctx.drawImage(img, 0, 0, elem.width, elem.height);
          ctx.canvas.toBlob(
            (blob) => {
              const resizedFile = new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              });
              resolve(resizedFile);
            },
            "image/jpeg",
            1
          );
        };
      };
      reader.readAsDataURL(file);
    });
  } 


  React.useEffect(() => {
    if (uploadedImage) {
      const getFaces = async (image) => {
        setFaceCount(null);
        setFaceDetectionLoading(true);
        try {
          const formData = new FormData();
          formData.append('faces', image);
          const response = await axios.post(process.env.NEXT_PUBLIC_FACE_DETECTION_URI, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'mode': 'cors',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            }
          });
          setFaceCount(response.data.faces);
      } catch (error) {
        console.log(error);
      }
      setFaceDetectionLoading(false);
      }
      getFaces(uploadedImage);
    }
  }, [uploadedImage]);

  React.useEffect(() => {
    //Inlcude all hair colors by default
    for (const [key, value] of hairColorMap.entries()) {
      setHairColors((hairColors) => [...hairColors, key]);
    }
  }, []);

  return (
    <div className={`xPaddings relative`}>
      <div className="mx-auto flex md:flex-row flex-col justify-between gap-2 max-width">
        <div className="w-full md:px-0 xPaddings">
          <div className={"flex w-full h-full justify-center"}>
            <div className="flex flex-col min-w-[400px] w-full items-center gap-6">
              <UploadImage
                image={uploadedImage}
                setUploadedImage={async (img) => {
                  const resizedFile = await produceResizedImageFile(img);
                  dispatch(setUploadedImage(resizedFile));
                  handleOpenImageModal();
                  dispatch(setError(null));
                }}
                clearUploadedImage={() => {
                  dispatch(setUploadedImage(null));
                  dispatch(setFilteredImages([]));
                  dispatch(setError(null));
                }}
              />

              {
                faceCount !== null && (
                  <div>
                    <p className="text-[15px] text-white">
                      {
                        faceCount === 1 ? "Your image looks good!": "Couldn't detect your face. Please upload another image with only one face."
                      }
                    </p>
                  </div>
                )
              }
              {
                faceDetectionLoading && (
                  <div>
                    <DotLoader color={"#ffffff"} loading={true} size={50} />
                  </div>
                )
              }
              <Preferences
                setGender={setGender}
                hairColorMap={hairColorMap}
                hairColors={hairColors}
                toggleSelectHairColor={toggleSelectHairColor}
                setVaryFacialHair={setVaryFacialHair}
              />
              {
                faceCount === 1 || faceCount === null && (
                  <div className="w-full md:px-0 px-5">
                <Button
                  disabled={gender != null && hairColors.length > 0 && varyFacialHair != null ? false : true}
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
                )
              }
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
