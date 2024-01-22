import { Button, Dropdown, ImageGallery, Modal } from "../components";
import { Dimensions, GenresData, Gendar, Tiers } from "../utils/mockdata";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toggleFilter, clearFilters } from "../store/imagesSlice";
import { useEffect, useState } from "react";
import FiltersSidebar from "../components/FiltersSidebar";

const Genres = () => {
  const dispatch = useDispatch();
  const [isSelectedFilter, setIsSelectedFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [gendarSelected, setGendarSelected] = useState("Male");
  const [openModal, setOpenModal] = useState(false);
  const [selectedTiers, setSelectedTiers] = useState([]);
  const router = useRouter();
  const { filters, uploadImage, filteredImages, error } = useSelector(
    (state) => state.images
  );
  const handleToggleFilter = (id) => {
    dispatch(toggleFilter({ id }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };
  const handleSelectedTier = (selectedTier) => {
    setSelectedTiers((prevSelectedTiers) => {
      // If the tier is already selected, remove it
      if (prevSelectedTiers.includes(selectedTier)) {
        return prevSelectedTiers.filter((tier) => tier !== selectedTier);
      } else {
        // If not selected, add it
        return [...prevSelectedTiers, selectedTier];
      }
    });
  };
  useEffect(() => {
    setIsSelectedFilter(
      Object.values(filters).some((value) => value.isChecked === true)
    );
    const newSelectedFilters = Object.keys(filters)
      .filter((key) => filters[key].isChecked)
      .map((key) => filters[key]);
    setSelectedFilters(newSelectedFilters);
  }, [filters]);
  const shouldRenderModal = window.matchMedia("(max-width: 767px)").matches;

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
      <div
        className={`flex flex-row gap-2 w-full overflow-auto
       scroll-container max-w-full`}
      >
        {GenresData.map((dim, i) => (
          <Button
            text={dim}
            image={dim === "Filters" ? "/assets/svgs/filters.svg" : null}
            key={i}
            onClick={() => {
              if (dim === "Filters") {
                setOpenModal(!openModal);
              }
            }}
          />
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
              setGendarSelected={setGendarSelected}
              gendarSelected={gendarSelected}
              selectedTiers={selectedTiers}
              handleSelectedTier={handleSelectedTier}
              selectedFilters={selectedFilters}
              handleToggleFilter={handleToggleFilter}
            />
          </Modal>
        ) : (
          openModal && (
            <FiltersSidebar
              setGendarSelected={setGendarSelected}
              gendarSelected={gendarSelected}
              selectedTiers={selectedTiers}
              handleSelectedTier={handleSelectedTier}
              selectedFilters={selectedFilters}
              handleToggleFilter={handleToggleFilter}
            />
          )
        )}

        <ImageGallery
          ImageSources={filters}
          handleImageSelection={handleToggleFilter}
          isSelectedImage={false}
        />
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
