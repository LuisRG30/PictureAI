import { Button, Dropdown, ImageGallery, Loader, Modal } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  toggleFilter,
  clearFilters,
  toogleGender,
  toogleTier,
  toogleGenre,
  setLoading,
} from "../store/images/imagesSlice";
import { useEffect, useState } from "react";
import FiltersSidebar from "../components/FiltersSidebar";
import { getSearchedFilters, getSelectedFilters } from "../utils/filtersHelper";
import SearchBar from "../components/SearchBar";

const Genres = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [searchedFilters, setSearchedFilters] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const { filters, uploadImage, filteredImages, error, genres, tiers, genders, sizes, isLoading } =
    useSelector((state) => state.images);
  const handleToggleFilter = (id) => {
    dispatch(toggleFilter({ id }));
  };

  const onSearchClick = () => {};

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
    dispatch(setLoading(true));
    const newFilters = getSearchedFilters(
      genres,
      genders,
      tiers,
      filters,
      searchInput
    );
    if (newFilters.length > 0) {
      setSearchedFilters(newFilters);
    } else if (!Array.isArray(newFilters)) {
      setSearchedFilters([]);
    } else {
      setSearchedFilters(filters);
    }
    dispatch(setLoading(false));
  }, [filters, genres, tiers, genders, searchInput]);

  useEffect(() => {
    const newFilters = getSelectedFilters(filters);
    setSelectedFilters(newFilters);
  }, [filters]);


  const mysteryBoxes = searchedFilters.filter((filter) => filter.tier === "mysterybox").sort((a, b) => a.order - b.order);
  const commonFilters = searchedFilters.filter((filter) => filter.tier === "common");
  const rareFilters = searchedFilters.filter((filter) => filter.tier === "rare");
  const epicFilters = searchedFilters.filter((filter) => filter.tier === "epic");
  const legendaryFilters = searchedFilters.filter((filter) => filter.tier === "legendary");


  const filterSections = [
    { title: "Mystery Box", filters: mysteryBoxes, price: ""},
    { title: "Common", filters: commonFilters, price: "$1.99" },
    { title: "Rare", filters: rareFilters, price: "$9.99" },
    { title: "Epic", filters: epicFilters, price: "$39.99" },
    { title: "Legendary", filters: legendaryFilters, price: "$99.99" },
  ]

  const gradientStyle = {
    backgroundImage: "linear-gradient(to right, rgba(222, 41, 226, 0.08), blue 500)",
  };
  const shouldRenderModal = typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;

  return (
    <div className="flex flex-col w-full py-4 gap-4 mb-40">
      <div className="flex md:flex-row flex-col md:gap-0 gap-2 w-full justify-between">
        <div className="flex flex-col gap-2 md:w-[60%] w-full">
          <div
            className={`flex flex-row gap-2 w-full overflow-auto
            scroll-container max-w-full`}
          >
          {[{ value: "Filters", selected: false }, ...(genres?.filter((genre) => genre.selected) || [])]?.map(
            (item, i) => (
              <div className="relative">
                <Button
                  text={item.value}
                  showDelBtn={item.value === "Filters" ? false : true}
                  image={item.value === "Filters" ? "/assets/svgs/filters.svg" : null}
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
            )
          )}
          </div>
        </div>
        <div className="flex flex-col gap-2 md:w-[38%] w-full">
          <SearchBar
            onClick={onSearchClick}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </div>
      </div>
      {/* make parent dive and rap the image gallery to a div */}
      <div className="h-[100%]   w-full flex flex-row">
        {shouldRenderModal ? (
          <Modal
            onClose={() => {
              setOpenModal(!openModal);
            }}
            isOpen={openModal}
            mainClass={"bg-[black]"}
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
              selectedFilters={selectedFilters}
              handleImageSelection={handleToggleFilter}
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
              selectedFilters={selectedFilters}
              handleImageSelection={handleToggleFilter}
            />
          )
        )}
        {isLoading ? (
          <div className="w-full flex h-[400px] justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchedFilters && searchedFilters.length > 0 ? (
              <div className="flex flex-col overflow-auto h-screen max-h-[600px] w-full ">
              {
                filterSections.map((section, i) => (
                   <div className="flex flex-col">
                      <div className="flex justify-center items-center w-full h-[50px]">
                        <p className="text-[20px] font-bold text-white">
                          {section.title}: {section.price}
                        </p>
                      </div>
                      <ImageGallery
                        ImageSources={section.filters}
                        handleImageSelection={handleToggleFilter}
                        isSelectedImage={false}
                        showPrice={section.title === "Mystery Box"}
                      />
                    </div>
              ))
              }
              </div>
            ) : (
              <div className="flex w-[100%] h-[100%]  xl:h-[380px] justify-center items-center">
                <p className="sub-text text-[15px]">No images found!</p>
              </div>
            )}
          </>
        )}
      </div>

      {!isLoading && (
        <div className="flex fixed w-5/6 bottom-4 justify-between items-center">
          {
            //Do not show this div if on a mobile device
            !shouldRenderModal && (
              <div className="flex flex-col w-[200px] justify-center items-center">
                <button
                  className="md:p-2 p-1 md:px-6 px-4 rounded-3xl border hover:border-[1px]
              border-gray-500 w-max hover:bg-[#DE29E233]"
                style={{
                  background:
                    "linear-gradient(90deg, #E85EFF 0%, #6843EC 108.39%)",
                }}
                  onClick={() => router.push("/mystery-box", { scroll: false })}
                >
                  <p className="text-[18px] font-bold font-san">Try Mystery Box</p>
                </button>
                <img
                  src="/assets/images/mystery-box.png"
                  alt="atro-img"
                  className="w-[195px] h-[190px]"
                />
              </div>
            )

          }
          {
            selectedFilters.length > 0 && (
              <div className="flex flex-col md:w-[200px] w-full justify-center mt-5">
            <button
              className="flex w-64 h-14 justify-center items-center self-center md:p-2 p-1 md:px-6 px-4 rounded-3xl border hover:border-[1px]
          border-gray-500  "
              style={{
                background:
                  "linear-gradient(90deg, #E85EFF 0%, #6843EC 108.39%)",
              }}
              onClick={() => router.push("/preview", { scroll: false })}
            >
              <p className="text-[18px] font-bold font-san">Generate</p>
            </button>
          </div>
            )
          }
        </div>
      )}
    </div>
  );
};

export { Genres };
