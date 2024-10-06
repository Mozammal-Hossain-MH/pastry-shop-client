import FixedBgComponent from "@/Shared/FixedBgComponent";
import Slider from "./slider";
import Heading from "@/Shared/Heading";
import ProductCard from "@/Shared/ProductCard";
import Button from "@/Shared/Button";
import Tabs from "@/Shared/Tabs";
import ProductCardOnCategory from "@/Shared/ProductCardOnCategory";
import Footer from "@/Shared/Footer";

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Milk Chocolate With Peanuts",
      description: "Nulla vulputate interdum aliquam",
      image: "/vanilla.png",
      regularPrice: 42.49,
      offerPrice: null,
    },
    {
      id: 2,
      name: "Milk Chocolate With Peanuts",
      description: "Nulla vulputate interdum aliquam",
      image: "/vanilla.png",
      regularPrice: 13.49,
      offerPrice: null,
    },
    {
      id: 3,
      name: "Milk Chocolate With Peanuts",
      description: "Nulla vulputate interdum aliquam",
      image: "/vanilla.png",
      regularPrice: 25.49,
      offerPrice: null,
    },
    {
      id: 4,
      name: "Milk Chocolate With Peanuts",
      description: "Nulla vulputate interdum aliquam",
      image: "/vanilla.png",
      regularPrice: 12.99,
      offerPrice: 11.49,
    },
    {
      id: 5,
      name: "Milk Chocolate With Peanuts",
      description: "Nulla vulputate interdum aliquam",
      image: "/vanilla.png",
      regularPrice: 12.99,
      offerPrice: 11.49,
    },
    {
      id: 6,
      name: "Milk Chocolate With Peanuts",
      description: "Nulla vulputate interdum aliquam",
      image: "/vanilla.png",
      regularPrice: 12.99,
      offerPrice: 11.49,
    },
    {
      id: 7,
      name: "Milk Chocolate With Peanuts",
      description: "Nulla vulputate interdum aliquam",
      image: "/vanilla.png",
      regularPrice: 12.99,
      offerPrice: 11.49,
    },
    {
      id: 8,
      name: "Milk Chocolate With Peanuts",
      description: "Nulla vulputate interdum aliquam",
      image: "/vanilla.png",
      regularPrice: 12.99,
      offerPrice: 11.49,
    },
  ];

  //
  const tabs = [
    {
      id: 1,
      name: "Cakes",
    },
    {
      id: 2,
      name: "Cookies",
    },
    {
      id: 3,
      name: "Pastries",
    },
  ];
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
    <div className="flex flex-col gap-20 overflow-hidden">
      {/* SLIDER */}
      <Slider
        prevNextBtn
        img={slides}
        running={true}
        dots={true}
        borderWidth={2}
        borderClr={"#000"}
      />

      {/* FIXED COMPONENT */}
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

      {/* FEATURED PRODUCTS */}
      <div className="space-y-10">
        <Heading
          subHeading={"Online Store"}
          heading={"Discover Sweet Delicious"}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
        <div className="flex flex-col justify-center items-center">
          <Button text={"Online Store"} paddings="px-10 py-5" />
        </div>
      </div>

      {/* CATEGORY */}
      <div className={`px-5 md:px-10 mb-20`}>
        <div className="space-y-10">
          <Heading subHeading={"Online Store"} heading={"Explore Categories"} />
          <Tabs tabs={tabs} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products?.map((product) => (
              <ProductCardOnCategory key={product?.id} product={product} />
            ))}
          </div>
          <div className="flex flex-col justify-center items-center">
            <Button text={"See More"} paddings="px-10 py-5" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
