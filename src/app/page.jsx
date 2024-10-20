import NavigateHandler from "@/Shared/Buttons/NavigateHandler";
import FixedBgComponent from "@/Shared/FixedBgComponent";
import Heading from "@/Shared/Heading";
import ProductCard from "@/Shared/ProductCard";
import HomeSearchWrapper from "@/Shared/SearchFields/HomeSearchWrapper";
import axios from "axios";
import CategorySection from "./CategorySection";
import Slider from "./slider";

export default async function page({ searchParams }) {
  console.log({ searchParams });
  const productByRandom = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/get/random?page=${
      searchParams?.page || 1
    }&perPage=${searchParams?.perPage || 8}&searchKey=${
      searchParams?.searchKey
    }`
  );
  const categories = await axios.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`
  );

  console.log({
    productByRandom: productByRandom?.data,
    categories: categories?.data?.data[0],
  });
  //
  const tabs = categories?.data?.data?.map((category) => ({
    id: category?.id,
    name: category?.name,
  }));
  // SLIDER IMAGES
  const images = [
    {
      id: 1,
      image: "/chocolate.jpg",
    },
    {
      id: 2,
      image: "/cake.jpg",
    },
    {
      id: 3,
      image: "/cherry.jpg",
    },
    {
      id: 4,
      image: "/candy.jpg",
    },
  ];
  const slides = images?.map((image) => image?.image);
  return (
    <div className="flex flex-col gap-20 overflow-hidden pb-20">
      {/* SLIDER */}
      <Slider
        prevNextBtn
        img={slides}
        running={true}
        dots={true}
        borderWidth={2}
        borderClr={"#000"}
      />

      {/* FEATURED PRODUCTS */}

      <div className="space-y-10">
        <Heading
          subHeading={"Online Store"}
          heading={"Discover Sweet Delicious"}
        />
        <HomeSearchWrapper />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productByRandom?.data?.data?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
        {/* <PaginationForServer
          total={productByRandom?.data?.total}
          page={searchParams?.page || 1}
          perPage={searchParams?.perPage || 2}
        /> */}
        <div className="flex flex-col justify-center items-center">
          <NavigateHandler text={"Online Store"} route={"/products"} />
        </div>
      </div>

      {/* FIXED COMPONENT */}
      <div className={`relative`}>
        <FixedBgComponent
          component={
            <div className="text-3xl md:text-6xl font-bold text-base-300 space-y-5 text-center relative">
              <p>Made with love</p>{" "}
              <p>
                <span className="text-primary">unique sweets</span> for gourmet
              </p>
              <div
                className={`w-full flex justify-center items-center absolute -top-10 rotating-square`}
              >
                <p
                  className={`h-32 md:h-48 w-32 md:w-48 border border-primary `}
                ></p>
              </div>
            </div>
          }
        />
        {/* <img
          className={`absolute -top-10 right-0 left-0`}
          src="/dark_temp.png"
          alt=""
        /> */}
      </div>

      {/* CATEGORY */}
      <div className={`px-5 md:px-10 mb-20`}>
        <CategorySection tabs={tabs} />
      </div>
    </div>
  );
}
