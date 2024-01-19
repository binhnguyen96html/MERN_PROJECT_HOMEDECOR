import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const Rating = ({ product, showNumReviews }) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex text-yellow-400">
        {product.rating >= 1 ? (
          <FaStar />
        ) : product.rating >= 0.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
        {product.rating >= 2 ? (
          <FaStar />
        ) : product.rating >= 1.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
        {product.rating >= 3 ? (
          <FaStar />
        ) : product.rating >= 2.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
        {product.rating >= 4 ? (
          <FaStar />
        ) : product.rating >= 3.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
        {product.rating >= 5 ? (
          <FaStar />
        ) : product.rating >= 4.5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaRegStar />
        )}
      </div>

      {showNumReviews && (
        <p className="text-sm">
          {`${product.numReviews} ${
            product.numReviews >= 1 ? "reviews" : "review"
          }`}
        </p>
      )}
    </div>
  );
};

export default Rating;
