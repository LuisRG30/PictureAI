import { Button, Dropdown, ImageGallery } from "../components";
import { Dimensions, GenresData } from "../utils/mockdata";
import { useSelector, useDispatch } from "react-redux";
import { toggleFilter, clearFilters } from "../store/imagesSlice";

const Genres = ({ filters, isSelectedFilter, selectedFilters }) => {
  const dispatch = useDispatch();
  const handleToggleFilter = (id) => {
    dispatch(toggleFilter({ id }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div
      className={`flex flex-col w-full pt-[45px] py-4 ${
        isSelectedFilter && "border border-[#374151] px-5"
      } rounded-lg`}
    >
      <div className="flex md:flex-row flex-col gap-4 w-full max-w-[1150px] justify-between ">
        <div className="flex flex-col gap-2 w-full ">
          <p className="md:text-[20px]  font-bold">Genres</p>
          <Dropdown options={GenresData} placeholder={"Select Genre..."} />
        </div>
        {!isSelectedFilter && (
          <div className="flex flex-col gap-2 md:w-[33%] w-full">
            <p className="md:text-[20px] text-[16px] font-bold">Sizes</p>
            <Dropdown options={Dimensions} placeholder={"Size"} />
          </div>
        )}
      </div>
      <div className="flex flex-row flex-wrap gap-2 w-full mt-[18px]">
        {GenresData.map((dim, i) => (
          <Button text={dim} key={i} isSelected={i === 0} />
        ))}
      </div>

      <div className={`max-w-[1150px]`}>
        <ImageGallery
          ImageSources={filters}
          handleImageSelection={handleToggleFilter}
          isSelectedImage={isSelectedFilter}
        />
      </div>
      {isSelectedFilter && (
        <div
          className="mt-4 py-4 border-t border-[#BABABA57] 
        flex flex-col"
        >
          <p className="text-white text-[14.43px] font-[helvetica] leading-[27.91px]">
            Selected Images will be shown here
          </p>
          <ImageGallery
            ImageSources={selectedFilters}
            handleImageSelection={handleToggleFilter}
            isSelectionDisabled={true}
            isSelectedImage={true}
          />
        </div>
      )}

      {!isSelectedFilter && (
        <div className="flex flex-col w-full justify-end items-end">
          <div className="flex flex-col w-[200px] justify-center items-center">
            <img
              src="/assets/images/mystery-box.png"
              alt="atro-img"
              className="w-[195px] h-[190px]"
            />
            <button
              className="md:p-2 p-1 md:px-6 px-4 rounded-3xl border hover:border-[1px]
          border-gray-500 w-max hover:bg-[#DE29E233]"
            >
              <p className="md:text-[15px] text-[13px]">Try Mystery Box</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { Genres };
