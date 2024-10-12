"use client";
import { getAllCategories } from "@/apis/categories";
import { getAllProducts } from "@/apis/products";
import CustomLoading from "@/Shared/CustomLoading";
import FixedBgComponent from "@/Shared/FixedBgComponent";
import { Pagination } from "@/Shared/Pagination";
import ProductCard from "@/Shared/ProductCard";
import TableComponentHeading from "@/Shared/TableComponentHeading";
import NavigateComponent from "@/Utils/navigate";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import { RiSoundModuleFill } from "react-icons/ri";

const page = () => {
  const [sidebar, setSidebar] = useState(false);
  const [filters, setFilters] = useState({ page: 1, perPage: 10 });

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
  }, [filters]);

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
      <div className={`grid grid-cols-1 lg:grid-cols-3 mx-5 md:mx-10 relative`}>
        {!sidebar && (
          <div
            className={`fixed lg:hidden left-0 bottom-40 z-[1000] py-4 pr-4 rounded-r-full bg-primary text-2xl text-base-300 font-bold  hover:bg-secondary transition-all active:scale-95`}
          >
            <RiSoundModuleFill
              className={`rotate-90`}
              onClick={() => setSidebar(true)}
            />
          </div>
        )}
        <div
          className={`absolute bg-base-100 z-50 lg:static top-0 w-[300px] transition-all ${
            sidebar ? "left-0" : "-left-[340px]"
          }`}
        >
          <div className={`flex flex-col justify-center items-start`}>
            <div className={`flex justify-between items-center w-full`}>
              <h2 className={`text-2xl lg:text-4xl font-bold text-primary`}>
                Product Categories
              </h2>
              <FiX
                onClick={() => setSidebar(false)}
                className={`text-4xl lg:hidden m-5 p-2 rounded-full w-auto text-primary bg-secondary transition-transform hover:scale-105 active:scale-95`}
              />
            </div>

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
        {isProductLoading ? (
          <CustomLoading />
        ) : (
          <div className={`col-span-2 space-y-5`}>
            <div>
              <h2 className={`text-xl font-bold text-primary`}>
                Total {products?.total}{" "}
                {products?.total > 1 ? "Products" : "Product"} Found
              </h2>
            </div>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 `}
            >
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
        )}
      </div>
    </div>
  );
};

export default page;
