import Slider from "./slider";

export default function Home() {
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
    <div>
      {/* SLIDER */}
      <Slider
        prevNextBtn
        img={slides}
        running={true}
        dots={true}
        borderWidth={2}
        borderClr={"#000"}
      />
    </div>
  );
}
