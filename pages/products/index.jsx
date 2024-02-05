import { Button, ImageGallery, UploadImage, Modal } from "@/src/components";
import { Genres, NotifyModal } from "@/src/sections";
import TermsModal from "@/src/sections/TermsModal";
import {
  selectFilters,
  selectUploadedImage,
  setUploadedImage,
  removeFilteredImagesById,
  setFilteredImages,
} from "@/src/store/images/imagesSlice";
import { fetchProducts } from '@/src/store/images/imagesActions';
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchInput = router.query.search;
  const { error } = useSelector(
    (state) => state.images
  );
  const [isOpenImageModal, setIsOpenImageModal] = useState(false);
  const [isOpenTermsModal, setIsOpenTermsModal] = useState(false);
  const stylesSelectionBox = {
    //width:'45%',
    background: "rgba(222, 41, 226, 0.08)",
  };
  const getProducts = async () => {
    try {
      await dispatch(fetchProducts());
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    getProducts();
  },[])

  const handleOpenImageModal = () => {
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
    router.push("/checkout", { scroll: false });
  };

  return (
    <div className={`${"xPaddings"} relative`}>
      <div className="mx-auto flex md:flex-row flex-col justify-between gap-2 max-width">
        <div className={`flex-none w-full`}>
          <Genres searchValue={searchInput}/>
        </div>
      </div>
      <NotifyModal
        isOpen={isOpenImageModal}
        onClose={handleCloseImageModal}
        error={error}
        OnSuccess={handleOpenTermsModal}
      />
      <TermsModal
        isOpen={isOpenTermsModal}
        onClose={handleCloseTermsModal}
        onAgree={handleAgreePress}
      />
    </div>
  );
};

export default Products;
