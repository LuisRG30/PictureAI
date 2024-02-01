import { Button, Dropdown, ImageGallery, Loader, Modal } from "../components";
import { Dimensions, GenresData, Gendar, Tiers } from "../utils/mockdata";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  toggleFilter,
  clearFilters,
  setTiers,
  setGenders,
  setGenres,
  toogleGender,
  toogleTier,
  toogleGenre,
  setLoading,
} from "../store/images/imagesSlice";
import { useEffect, useState } from "react";
import FiltersSidebar from "../components/FiltersSidebar";
import { getSearchedFilters } from "../utils/filtersHelper";

const Genres = ({searchValue}) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [searchedFilters, setSearchedFilters] = useState([]);
  const router = useRouter();
  const {
    filters,
    uploadImage,
    filteredImages,
    error,
    genres,
    tiers,
    genders,
    sizes,
    isLoading,
  } = useSelector((state) => state.images);
  const handleToggleFilter = (id) => {
    dispatch(toggleFilter({ id }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const handleSelectedTier = (tier) => {
    dispatch(toogleTier(tier));
  };

  const handleSelectedGender = (gender) => {
    dispatch(toogleGender(gender));
  };

  const handleSelectedGenre = (genre) => {
    dispatch(toogleGenre(genre));
  };

  useEffect(() => {
    console.log("--------inp", searchValue)
    dispatch(setLoading(true));
    const newFilters = getSearchedFilters(genres, genders, tiers, filters);
    if (newFilters.length > 0) {
      setSearchedFilters(newFilters);
    } else if (!Array.isArray(newFilters)) {
      setSearchedFilters([]);
    } else {
      setSearchedFilters(filters);
    }
    dispatch(setLoading(false));
  }, [filters, genres, tiers, genders, sizes]);
  const shouldRenderModal =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 767px)").matches;

  return (
    <div className="flex flex-col w-full py-4 gap-4">
      <div className="flex md:flex-row flex-col md:gap-0 gap-2 w-full justify-between">
        <div className="flex flex-col gap-2 md:w-[60%] w-full">
          <p className="md:text-[20px]  font-bold">Genres</p>
          <Dropdown
            options={genres?.filter((genre) => !genre.selected)}
            placeholder={"Select Genre..."}
            handleSelectedOption={handleSelectedGenre}
          />
        </div>
        <div className="flex flex-col gap-2 md:w-[38%] w-full">
          <p className="md:text-[20px] text-[16px] font-bold">Sizes</p>
          <Dropdown
            options={sizes}
            placeholder={"Size"}
            handleSelectedOption={(opt) => {}}
          />
        </div>
      </div>
      <div
        className={`flex flex-row gap-2 w-full overflow-auto
       scroll-container max-w-full`}
      >
        {[
          { value: "Filters", selected: false },
          ...(genres?.filter((genre) => genre.selected) || []),
        ]?.map((item, i) => (
          <div className="relative">
            <Button
              text={item.value}
              showDelBtn={item.value === "Filters" ? false : true}
              image={
                item.value === "Filters" ? "/assets/svgs/filters.svg" : null
              }
              key={i}
              styles={{ minWidth: 160 }}
              delBtnClick={() => {
                handleSelectedGenre(item);
              }}
              onClick={() => {
                if (item.value === "Filters") {
                  setOpenModal(!openModal);
                }
              }}
            />
          </div>
        ))}
      </div>
      {/* make parent dive and rap the image gallery to a div */}
      <div className="  w-full flex flex-row">
        {shouldRenderModal ? (
          <Modal
            onClose={() => {
              setOpenModal(!openModal);
            }}
            isOpen={openModal}
            mainClass={"bg-black"}
          >
            {" "}
            <FiltersSidebar
              handleSelectedGender={handleSelectedGender}
              genders={genders}
              tiers={tiers}
              handleSelectedTier={handleSelectedTier}
              handleCloseFilter={() => {
                setOpenModal(!openModal);
              }}
            />
          </Modal>
        ) : (
          openModal && (
            <FiltersSidebar
              handleSelectedGender={handleSelectedGender}
              genders={genders}
              tiers={tiers}
              handleSelectedTier={handleSelectedTier}
              handleCloseFilter={() => {
                setOpenModal(!openModal);
              }}
            />
          )
        )}
        {isLoading ? (
          <div className="w-full flex h-[300px] justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchedFilters && searchedFilters.length > 0 ? (
              <ImageGallery
                ImageSources={searchedFilters}
                handleImageSelection={handleToggleFilter}
                isSelectedImage={false}
              />
            ) : (
              <div className="flex h-[100%] w-[100%] justify-center items-center">
                <p className="sub-text text-[15px]">No images found!</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* {isSelectedFilter && (
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
      )} */}

      <div className="flex flex-row w-full justify-between items-center ">
        <div className="flex flex-col w-[200px] justify-center items-center"></div>
        <div className="flex flex-col w-[200px] justify-center items-center">
          <button
            className="flex w-64 h-14 justify-center items-center self-center md:p-2 p-1 md:px-6 px-4 rounded-3xl border hover:border-[1px]
          border-gray-500  "
            style={{
              background: "linear-gradient(90deg, #E85EFF 0%, #6843EC 108.39%)",
            }}
            onClick={() => router.push("/preview", { scroll: false })}
          >
            <p className="text-[18px] font-bold font-san">Generate</p>
          </button>
        </div>
        <div className="flex flex-col w-[200px] justify-center items-center">
          <img
            src="/assets/images/mystery-box.png"
            alt="atro-img"
            className="w-[195px] h-[190px]"
          />
          <button
            className="md:p-2 p-1 md:px-6 px-4 rounded-3xl border hover:border-[1px]
          border-gray-500 w-max hover:bg-[#DE29E233]"
            onClick={() => router.push("/mystery-box", { scroll: false })}
          >
            <p className="md:text-[15px] text-[13px]">Try Mystery Box</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export { Genres };
