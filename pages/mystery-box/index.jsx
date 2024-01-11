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

const MysteryBox = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen mt-20 mx-auto"
      style={{ maxWidth: "1440px" }}
    >
      <h1
        className="sm:text-[55px] text-[35px] 
              font-bold p-0 leading-none"
      >
        MYSTERY PACKAGES
      </h1>
      <div className="flex flex-row flex-wrap mt-20 gap-10">
        <div className="flex flex-col justify-center items-center gap-6">
          <img src="/assets/svgs/silver-box.svg" width={229} height={248} />
          <Button text="Silver $10" classes=" w-[445px]" />
          <div className="border border-1 rounded-md p-4">
            <p>
              You may get: <br />
              ------------------------------------------------
              <br />
              1. Lorem Ipsum dolor <br />
              2. Lorem Ipsum dolor <br />
              3. Lorem Ipsum dolor{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6">
          <img src="/assets/svgs/golden-box.svg" width={229} height={248} />
          <Button text="Gold $40" />
          <div className="border border-1 rounded-md p-4">
            <p>
              You may get: <br />
              ------------------------------------------------
              <br />
              1. Lorem Ipsum dolor <br />
              2. Lorem Ipsum dolor <br />
              3. Lorem Ipsum dolor{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center gap-6">
          <img src="/assets/svgs/diamond-box.svg" width={229} height={248} />
          <Button text="Diamond $80" />
          <div className="border border-1 rounded-md p-4">
            <p>
              You may get: <br />
              ------------------------------------------------
              <br />
              1. Lorem Ipsum dolor <br />
              2. Lorem Ipsum dolor <br />
              3. Lorem Ipsum dolor{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MysteryBox;
