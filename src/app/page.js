import ParallaxComponent from "@/Shared/ParallaxComponent";
import Slider from "./slider";
import Heading from "@/Shared/Heading";
import ProductCard from "@/Shared/ProductCard";
import FixedBgComponent from "@/Shared/FixedBgComponent";

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Milk Chocolate With Peanuts",
      image:
        "http://crems.like-themes.com/wp-content/uploads/2019/06/shop-06.png",
      regularPrice: 42.49,
      offerPrice: null,
    },
    {
      id: 2,
      name: "Milk Chocolate With Peanuts",
      image:
        "http://crems.like-themes.com/wp-content/uploads/2019/06/shop-06.png",
      regularPrice: 13.49,
      offerPrice: null,
    },
    {
      id: 3,
      name: "Milk Chocolate With Peanuts",
      image:
        "http://crems.like-themes.com/wp-content/uploads/2019/06/shop-06.png",
      regularPrice: 25.49,
      offerPrice: null,
    },
    {
      id: 4,
      name: "Milk Chocolate With Peanuts",
      image:
        "http://crems.like-themes.com/wp-content/uploads/2019/06/shop-06.png",
      regularPrice: 12.99,
      offerPrice: 11.49,
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
      image: "/dairyMilk.jpg",
    },
    {
      id: 3,
      image: "/chocolate.jpg",
    },
  ];
  const slides = images?.map((image) => image?.image);
  return (
    <div className="flex flex-col gap-20">
      {/* SLIDER */}
      <Slider
        prevNextBtn
        img={slides}
        running={true}
        dots={true}
        borderWidth={2}
        borderClr={"#000"}
      />
      <FixedBgComponent />
      <div>
        <Heading
          subHeading={"Online Store"}
          heading={"Discover Sweet Delicious"}
        />
        <div className="grid grid-cols-4 gap-5">
          {products?.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
