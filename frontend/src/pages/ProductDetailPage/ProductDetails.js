import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import SizeFilter from "../../components/Filters/SizeFilter";
import ProductColors from "./ProductColors";
import SvgCreditCard from "../../components/common/SvgCreditCard";
import SvgCloth from "../../components/common/SvgCloth";
import SvgShipping from "../../components/common/SvgShipping";
import SvgReturn from "../../components/common/SvgReturn";
import { useDispatch, useSelector } from "react-redux";
import { getProductBySlug } from "../../api/fetchProducts"; // Ensure this API call fetches one product by ID
import _ from "lodash";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { API_BASE_URL } from "../../api/constant";

const extraSections = [
  { icon: <SvgCreditCard />, label: "Secure payment" },
  { icon: <SvgCloth />, label: "Size & Fit" },
  { icon: <SvgShipping />, label: "Free shipping" },
  { icon: <SvgReturn />, label: "Free Shipping & Returns" },
];

const ProductDetails = () => {
  const location = useLocation();
  const { product, description, cost, thumbnail, rating, id, slug } =
    location.state || {};

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartState?.cart);

  const [image, setImage] = useState();
  const [breadCrumbLinks, setBreadCrumbLink] = useState([]);
  const [similarProduct, setSimilarProducts] = useState([]);
  const [selecteSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch product details by slug using the API call
  useEffect(() => {
    setLoading(true);
    getProductBySlug(slug)
      .then((productData) => {
        if (productData) {
          setImage(productData?.thumbnail);
          setSimilarProducts(productData?.similarProducts || []);
        }
      })
      .catch((error) => {
        setError("Failed to load product details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  const productCategory = useMemo(() => {
    return product?.category;
  }, [product]);

  useEffect(() => {
    if (product) {
      const arrayLinks = [
        { title: "Shop", path: "/" },
        {
          title: productCategory?.name,
          path: `/category/${productCategory?.id}`,
        },
      ];
      setBreadCrumbLink(arrayLinks);
    }
  }, [product, productCategory]);

  const placeOrder = useCallback(async () => {
    const authToken = localStorage.getItem("authToken");
    const decodedToken = jwtDecode(authToken);

    try {
      setLoading(true); // Start loading
      debugger;
      const response = await axios.post(
        API_BASE_URL + "/api/orders",
        {
          userId: parseInt(decodedToken?.sub),
          productId: id,
          quantify: 1,
          price: cost,
          date: new Date().toISOString(),
          orderShipped: "PENDING",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Order placed successfully!");
        setError(""); // Clear any previous errors
      } else {
        setError(response.data?.message || "Failed to place order");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading
    }
  }, [product, selecteSize, id]);

  const colors = useMemo(() => {
    const colorSet = _.uniq(_.map(product?.variants, "color"));
    return colorSet;
  }, [product]);

  const sizes = useMemo(() => {
    const sizeSet = _.uniq(_.map(product?.variants, "size"));
    return sizeSet;
  }, [product]);

  if (loading) return <div>Loading...</div>; // Display loading state until data is fetched
  if (!product) return <div>Product not found</div>; // Handle the case when product is not found

  return (
    <div className="flex flex-col md:flex-row px-10">
      <div className="w-[100%] lg:w-[50%] md:w-[40%]">
        {/* Image */}
        <div className="flex flex-col md:flex-row">
          <div className="w-[100%] md:w-[20%] justify-center h-[40px] md:h-[420px]">
            {/* Stack images */}
            <div className="flex flex-row md:flex-col justify-center h-full">
              {product?.productResources?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setImage(item?.url)}
                  className="rounded-lg w-fit p-2 mb-2"
                >
                  <img
                    src={item?.url}
                    className="h-[60px] w-[60px] rounded-lg bg-cover bg-center hover:scale-105 hover:border"
                    alt={"sample-" + index}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[80%] flex justify-center md:pt-0 pt-10">
            <img
              src={thumbnail}
              className="h-full w-full max-h-[520px] border rounded-lg cursor-pointer object-cover"
              alt={product?.name}
            />
          </div>
        </div>
      </div>
      <div className="w-[60%] px-10">
        {/* Product Description */}
        <Breadcrumb links={breadCrumbLinks} />
        <p className="text-3xl pt-4">{product?.name}</p>
        <p className="text-xl bold py-2">${cost}</p>

        <div className="mt-2">
          <SizeFilter
            onChange={(values) => {
              setSelectedSize(values?.[0] ?? "");
            }}
            sizes={sizes}
            hidleTitle
            multi={false}
          />
        </div>
        <div>
          <p className="text-lg bold">{description}</p>
          <ProductColors colors={colors} />
        </div>
        <div className="flex py-4">
          <button
            disabled={loading}
            className="bg-black rounded-lg hover:bg-gray-700"
          >
            <div className="flex h-[42px] rounded-lg w-[150px] px-2 items-center justify-center bg-black text-white hover:bg-gray-700">
              <svg
                width="17"
                height="16"
                className=""
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.5 1.33333H2.6L4.33333 9.6H13.6667L15.4 1.33333H16.5"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.8 10.6667H5.20001C4.76501 10.6667 4.36667 11.066 4.20001 11.5L3.20001 14.5C3.03334 14.9333 3.43334 15.3333 3.86667 15.3333H13.1333C13.5667 15.3333 13.9667 14.9333 13.8 14.5L12.8 11.5C12.6333 11.066 12.2333 10.6667 11.8 10.6667Z"
                  stroke="white"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="ml-2" onClick={placeOrder}>
                Order it
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
