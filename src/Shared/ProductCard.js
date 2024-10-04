const ProductCard = ({ product }) => {
  return (
    <div>
      <div>
        <img src={product?.image} alt={product?.name} />
      </div>
      <div className="text-center">
        <p className="text-[30px] font-bold">{product?.name}</p>
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
    </div>
  );
};

export default ProductCard;
