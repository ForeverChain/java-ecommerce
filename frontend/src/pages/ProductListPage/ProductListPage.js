import React, { useEffect, useMemo, useState } from "react";
import FilterIcon from "../../components/common/FilterIcon";
import content from "../../data/content.json";
import Categories from "../../components/Filters/Categories";
import PriceFilter from "../../components/Filters/PriceFilter";
import ColorsFilter from "../../components/Filters/ColorsFilter";
import SizeFilter from "../../components/Filters/SizeFilter";
import ProductCard from "./ProductCard";
import { getAllProducts } from "../../api/fetchProducts";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/features/common";
const categories = content?.categories;

const ProductListPage = ({ categoryType }) => {
  const categoryData = useSelector((state) => state?.categoryState?.categories);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Added error state
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const categoryContent = useMemo(() => {
    return categories?.find((category) => category.code === categoryType);
  }, [categoryType]);

  console.log("products", products);

  const productListItems = useMemo(() => {
    return content?.products?.filter(
      (product) => product?.category_id === categoryContent?.id
    );
  }, [categoryContent]);

  const category = useMemo(() => {
    return categoryData?.find((element) => element?.code === categoryType);
  }, [categoryData, categoryType]);

  useEffect(() => {
    setIsLoading(true); // Start loading
    setError(null); // Reset any previous error
    dispatch(setLoading(true));

    // Call the API to fetch products for the selected category
    getAllProducts()
      .then((res) => {
        setProducts(res); // Set the products data
      })
      .catch((err) => {
        setError("Failed to load products. Please try again later."); // Set error message
      })
      .finally(() => {
        setIsLoading(false); // End loading
        dispatch(setLoading(false)); // End loading globally
      });
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Display error message if there is an error
  }

  return (
    <div>
      <div className="flex">
        <div className="p-[15px]">
          <p className="text-black text-lg">{category?.description}</p>
          {/* Products */}
          <div className="pt-4 grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8 px-2">
            {products?.data?.map((item, index) => (
              <ProductCard
                key={item?.id + "_" + index}
                {...item}
                thumbnail={item?.image}
                title={item?.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
