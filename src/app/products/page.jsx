"use client";
import { getAllCategories } from "@/apis/categories";
import { getAllProducts } from "@/apis/products";
import FixedBgComponent from "@/Shared/FixedBgComponent";
import { Pagination } from "@/Shared/Pagination";
import ProductCard from "@/Shared/ProductCard";
import TableComponentHeading from "@/Shared/TableComponentHeading";
import NavigateComponent from "@/Utils/navigate";
import { useEffect, useState } from "react";

const page = () => {
  const [filters, setFilters] = useState({ page: 1, perPage: 2 });

  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [categories, seCategories] = useState([]);
  useEffect(() => {
    setIsCategoryLoading(true);
    getAllCategories()
      .then((res) => {
        if (res?.data) {
          seCategories(res);
          setIsCategoryLoading(false);
        }
      })
      .catch((err) => {
        setIsCategoryLoading(false);
        console.log({ err });
      });
  }, []);

  const [isProductLoading, setIsProductLoading] = useState(false);
  const [products, setProducts] = useState([]);
  console.log({ products });
  useEffect(() => {
    setIsProductLoading(true);
    getAllProducts(filters)
      .then((res) => {
        console.log({ res });
        if (res?.data) {
          setProducts(res);
          setIsProductLoading(false);
        }
      })
      .catch((err) => {
        setIsProductLoading(false);
        console.log({ err });
      });
  }, []);

  console.log({ productsFromPage: products });
  return (
    <div className={`space-y-20 pb-40`}>
      <FixedBgComponent
        url="/chocolate_bg.jpg"
        wrapperClass={`pt-60 pb-40`}
        component={
          <TableComponentHeading
            routes={
              <div className={`text-[14px]`}>
                <span className={`text-primary cursor-pointer`}>
                  <NavigateComponent text="Home" route="/" />
                </span>{" "}
                // <span>Products</span>
              </div>
            }
            heading={"All Products"}
          />
        }
      />
      <div className={`grid grid-cols-3 mx-5 md:mx-10`}>
        <div>
          <div className={`flex flex-col justify-center items-start`}>
            <h2 className={`text-2xl md:text-4xl font-bold text-primary`}>
              Product Categories
            </h2>

            <div className={`w-full `}>
              <div className={`wavy-line-nav`}></div>
            </div>
          </div>
          <div className={`flex flex-col justify-start items-start gap-2 `}>
            {categories?.data?.map((category, i) => (
              <button
                key={i}
                className={`text-xl font-medium hover:text-primary p-2 rounded-lg transition-all`}
              >
                {category?.name}
              </button>
            ))}
          </div>
        </div>
        <div className={`col-span-2`}>
          <div className={`grid grid-cols-3 gap-5 `}>
            {products?.data?.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
          {/* PAGINATION */}
          <Pagination
            setFilters={setFilters}
            filters={filters}
            total={products?.total}
          />
        </div>
      </div>
    </div>
  );
};

export default page;
