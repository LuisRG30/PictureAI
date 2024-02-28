import { useRouter } from "next/router";
import React from "react";

import Image from "next/image";

import ImageWithHover from "./ImageWithHover";

const ImageGallery = ({
  ImageSources,
  handleImageSelection,
  isSelectedImage,
  isSelectionDisabled,
  isRemoveEnabled,
  handleRemoveImage,
  isFilterBar,
  isPreview,
  isFulfillment,
  showPrice,
}) => {
  const router = useRouter();
  const selectedStyles =
    "flex-shrink-0 w-2/5 sm:w-1/4 md:w-1/4 lg:w-1/5 xl:w-1/6 rounded-md mb-3 relative cursor-pointer";
  const notSelectedStyles =
    "flex-shrink-0 w-2/5 sm:w-1/4 md:w-1/5 rounded-md mb-3 relative cursor-pointer";
  return (
    <>
      <div className="flex flex-wrap justify-center w-full gap-4">
          {Array.isArray(ImageSources) &&
            ImageSources.map((img, i) => (
              <div
                className={
                  !isFilterBar &&
                  (!isSelectedImage ? selectedStyles : notSelectedStyles)
                }
                onClick={() => handleImageSelection(img?.id)}
                key={i}
              >
                {!isFilterBar && img.selected && !isSelectionDisabled && (
                  <div
                    className="w-[20px] h-[20px] bg-gray-300 absolute right-4
                     top-4 rounded-xl bg-purple-gradient flex items-center justify-center"
                  >
                    <img
                      src="assets/svgs/checked.svg"
                      className="w-[11px] h-[11px]"
                      alt="Checkmark"
                    />
                  
                  </div>
                )}
                {isRemoveEnabled && (
                  <img
                    src={`assets/svgs/trash.svg`}
                    alt={`img-${i}`}
                    style={{ top: "5px", right: "5px" }}
                    className="absolute w-[12px] h-[12px] cursor-pointer rounded-md"
                  />
                )}
                {
                  !isFulfillment ? (
                  <div className="flex flex-col justify-center items-center">
                    <img
                  key={i}
                  className={`${
                    isFilterBar
                      ? "md:w-[121px] md:h-[112px] h-[100px] w-[100px]"
                      : `max-h-[270px] sm:h-[150px] h-[120px] ${
                          isSelectedImage ? "md:h-[82px]" : "md:h-[220px]"
                        }  w-full rounded-md`
                  } 
                  `}
                  src={`${img.source || img.url}`}
                  alt={`Image ${i}`}
                />
                {showPrice && (
                  <>
                  <p className="text-[20px] font-bold text-[#e0dada]">{img.genre}</p>
                  <p className="text-[20px] font-bold text-[#e0dada]">
                    ${img.price}
                  </p>
                  </>
                )}
                </div>
                  ) : (
                    <ImageWithHover
                      key={i}
                      src={`${img.source || img.url}`}
                      name={img.Metadata.promptname}
                    />
                  )
                }
              </div>
            ))}
          {isPreview && isPreview === true && (
            <div
              className="h-[110px] w-[110px]  relative border-dashed border-2 
          rounded-xl border-[#2D3541] justify-center items-center flex flex-col py-3"
              // style={{ height: "80px", width: "90px" }}
              onClick={() => router.push("/products", { scroll: false })}
            >
              <img
                src={`assets/images/Add.png`}
                alt={`Add`}
                style={{ height: "30px", width: "30px" }}
              />
              <p className="flex text-base text-[#2D3541]">Add more</p>
            </div>
          )}
        </div>
    </>
  );
};

export { ImageGallery };
