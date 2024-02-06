import { Genres } from "@/src/sections";
import { fetchProducts } from '@/src/store/images/imagesActions';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchInput = router.query.search;

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

  return (
    <div className={`${"xPaddings"} relative`}>
      <div className="mx-auto flex md:flex-row flex-col justify-between gap-2 max-width">
        <div className={`flex-none w-full`}>
          <Genres searchValue={searchInput}/>
        </div>
      </div>
    </div>
  );
};

export default Products;
