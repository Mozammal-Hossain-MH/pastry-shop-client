"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "./Button";
import "./sharedAnimation.css";
import { getFullImageLink } from "@/Utils/getFullImageLink";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  const useDeviceWidth = () => {
    const [width, setWidth] = useState(() =>
      typeof window !== "undefined" ? window.innerWidth : 0
    );

    useEffect(() => {
      // Only add event listener in the browser
      if (typeof window !== "undefined") {
        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }
    }, []);

    return width;
  };
  console.log(useDeviceWidth());
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative image-hover "
    >
      <div
        // style={{ backgroundImage: `url(/dots.png)` }}
        className="overflow-hidden rotating-background"
      >
        {console.log({ product })}
        <img
          className="jump-image"
          src={getFullImageLink(
            product?.images?.length > 0 && product?.images[0]?.file,
            "Products"
          )}
          alt={product?.name}
        />
      </div>
      <motion.div
        animate={
          useDeviceWidth() > 768
            ? isHovered
              ? { opacity: 1 }
              : { opacity: 0 }
            : ""
        }
        className="my-5 flex flex-col justify-center items-center transition-all cart-button"
      >
        <Button text={"Add to cart"} />
      </motion.div>
      <motion.div
        // initial={{ y: -100 }}
        animate={
          useDeviceWidth() > 768 ? (isHovered ? { y: 0 } : { y: -70 }) : ""
        }
        transition={{ type: "spring", stiffness: 100 }}
        className="text-center"
      >
        <p className="text-[20px] font-bold hover:text-primary transition-all">
          {product?.name}
        </p>
        <div className="flex justify-center items-center gap-2">
          <p
            className={`${
              product?.offerPrice ? "text-base-200" : "text-primary"
            }`}
          >
            ${product?.regularPrice}
          </p>
          {product?.offerPrice && (
            <p className={`text-red-500`}>${product?.offerPrice}</p>
          )}
        </div>
      </motion.div>
      {product?.offerPrice && (
        <div
          className={`bg-red-500 w-10 h-10 rounded-full text-base-300 font-medium absolute top-3 right-3 flex justify-center items-center text-[12px]`}
        >
          <p>Sale</p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
