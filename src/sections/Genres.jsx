import { Button, Dropdown, ImageGallery } from "../components";
import { Dimensions, GenresData } from "../utils/mockdata";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from 'next/navigation'
import { toggleFilter, clearFilters } from "../store/imagesSlice";

const Genres = ({ filters, isSelectedFilter, selectedFilters }) => {
  const dispatch = useDispatch();
  const router = useRouter()
  const handleToggleFilter = (id) => {
    dispatch(toggleFilter({ id }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="flex flex-col w-full py-4 gap-4">
      <div className="flex md:flex-row flex-col md:gap-0 gap-2 w-full justify-between">
        <div className="flex flex-col gap-2 md:w-[60%] w-full">
          <p className="md:text-[20px]  font-bold">Genres</p>
          <Dropdown options={GenresData} placeholder={"Select Genre..."} />
        </div>
        <div className="flex flex-col gap-2 md:w-[38%] w-full">
          <p className="md:text-[20px] text-[16px] font-bold">Sizes</p>
          <Dropdown options={Dimensions} placeholder={"Size"} />
        </div>
      </div>
      <div className={`flex flex-row gap-2 w-full overflow-auto
       scroll-container ${isSelectedFilter ? "md:max-w-[420px]":"md:max-w-full"} `}>
        {GenresData.map((dim, i) => (
          <Button text={dim} key={i}/>
        ))}
      </div>

      <ImageGallery
        ImageSources={filters}
        handleImageSelection={handleToggleFilter}
        isSelectedImage={isSelectedFilter}
      />

      {isSelectedFilter && (
        <div
          className=" py-4 border-t border-gray-500
        flex flex-col"
        >
          <p className="sub-text text-[15px]">
            Selected Images will be shown here
          </p>
          <div className="pt-4">
            <ImageGallery
              ImageSources={selectedFilters}
              isSelectionDisabled={true}
              isSelectedImage={true}
            />
          </div>
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
          onClick={() => router.push('/mystery-box', { scroll: false })}
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
