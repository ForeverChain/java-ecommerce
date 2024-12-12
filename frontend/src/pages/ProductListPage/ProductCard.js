import React from "react";
import SvgFavourite from "../../components/common/SvgFavourite";
import { useNavigate } from "react-router-dom"; // Importing useNavigate

const ProductCard = ({
  id,
  product,
  description,
  cost,
  discount, // Fixed typo here from 'discoutnt' to 'discount'
  rating,
  brand,
  thumbnail,
  slug,
}) => {
  const navigate = useNavigate(); // Using the navigate hook
  const handleNavigate = () => {
    navigate(`/clothing/${slug || id}`, {
      state: {
        id,
        product,
        description,
        cost,
        discount, // Fixed typo here from 'discoutnt' to 'discount'
        rating,
        brand,
        thumbnail,
      },
    });
  };

  return (
    <div className="flex flex-col hover:scale-105 relative">
      <div
        onClick={handleNavigate} // Trigger navigation on click
        className="cursor-pointer"
      >
        <img
          className="h-[320px] w-[280px] border rounded-lg object-cover block"
          src={thumbnail}
          alt={product}
        />
      </div>

      <div className="flex justify-between items-center mt-2">
        <div className="flex flex-col">
          <p className="text-[16px] p-1 font-semibold">{product}</p>
          {description && (
            <p className="text-[12px] px-1 text-gray-600">{brand}</p>
          )}
        </div>
        <div className="flex flex-col justify-end items-end">
          <p className="text-lg font-bold">${cost}</p>
        </div>
      </div>

      <button
        onClick={() => console.log("Click button")}
        className="absolute top-0 right-0 pt-4 pr-4 cursor-pointer"
      >
        <SvgFavourite />
      </button>
    </div>
  );
};

export default ProductCard;
