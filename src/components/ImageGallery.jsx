import React from "react";

const ImageGallery = ({
  ImageSources,
  handleImageSelection,
  isSelectedImage,
  isSelectionDisabled,
  isRemoveEnabled,
  handleRemoveImage
}) => {
  return (
    <>
      {!isRemoveEnabled ? (
        <div className="flex flex-wrap justify-center w-full gap-4">
          {Array.isArray(ImageSources) &&
            ImageSources.map((img, i) => (
              <div
                className="flex-shrink-0 w-2/5 sm:w-1/4 md:w-1/3 lg:w-1/4 xl:w-1/4
                 rounded-md mb-3 relative cursor-pointer"
                onClick={() => handleImageSelection(img?.id)}
                key={i}
              >
                {img.isChecked && !isSelectionDisabled && (
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
                    className="absolute w-[12px] h-[12px] cursor-pointer"
                  />
                )}
                <img
                  key={i}
                  className={`max-h-[270px] sm:h-[150px] h-[120px]
                
                  ${isSelectedImage ? "md:h-[82px]" : "md:h-[220px]"}  w-full
                  
                  `}
                  src={`assets/images/${img.source}`}
                  alt={`Image ${i}`}
                />
              </div>
            ))}
        </div>
      ) : (
        <div className="w-full flex flex-wrap gap-3">
          {ImageSources.map((filter, index) => (
            <div
              key={index}
              className="h-[90px] w-[90px] flex-shrink-0 relative border
            rounded-xl border-gray-800 justify-center items-center flex"
              style={{ height: "80px", width: "90px" }}
            >
              <img
                src={`assets/svgs/trash.svg`}
                alt={`img-${index}`}
                style={{ top: "5px", right: "5px" }}
                className="absolute w-[12px] h-[12px] cursor-pointer"
                onClick={() => {handleRemoveImage(filter?.id)}}
              />
              <img
                src={`assets/images/${filter.source}`}
                alt={`img-${index}`}
                style={{ height: "50px", width: "50px" }}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export { ImageGallery };
