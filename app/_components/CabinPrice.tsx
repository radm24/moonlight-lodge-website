type CabinPriceProps = {
  regularPrice: number;
  discount: number;
};

function CabinPrice({ regularPrice, discount }: CabinPriceProps) {
  return (
    <p className="mt-6 flex gap-3 justify-end items-baseline">
      {discount > 0 ? (
        <>
          <span className="text-3xl font-[350]">
            ${regularPrice - discount}
          </span>
          <span className="line-through font-semibold text-primary-600">
            ${regularPrice}
          </span>
        </>
      ) : (
        <span className="text-3xl font-[350]">${regularPrice}</span>
      )}
      <span className="text-primary-200">/ night</span>
    </p>
  );
}

export default CabinPrice;
