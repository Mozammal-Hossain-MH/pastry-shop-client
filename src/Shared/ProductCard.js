import Button from "./Button";
import "./sharedAnimation.css";

const ProductCard = ({ product }) => {
  return (
    <div className="relative image-hover">
      <div
        // style={{ backgroundImage: `url(/dots.png)` }}
        className="overflow-hidden rotating-background"
      >
        <img className="jump-image" src={product?.image} alt={product?.name} />
      </div>
      <div className="my-5 flex flex-col justify-center items-center">
        <Button text={"Add to cart"} />
      </div>
      <div className="text-center">
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
      </div>
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
