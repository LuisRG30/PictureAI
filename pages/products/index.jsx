import ReactGA from 'react-ga4';

import { Genres } from "@/src/sections";
import { fetchProducts } from '@/src/store/images/imagesActions';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchInput = router.query.search;
  const { products } = useSelector((state) => state.images);

  const getProducts = async () => {
    try {
      await dispatch(fetchProducts());
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    if(!products || products.length <=0){
      getProducts();
    }
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID);
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
