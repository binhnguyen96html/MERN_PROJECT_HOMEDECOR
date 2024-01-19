import Rating from "./Rating";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    // <Link to={`/product/${product._id}`}>
    //   <div className="shadow rounded-md max-w-sm h-72">

    //       <div className="overflow-hidden h-full">
    //         <img
    //           src={product.image}
    //           alt="product"
    //           className="object-cover"
    //           // className="object-cover w-full h-full max-h-64"
    //         />
    //       </div>

    //       <div className="p-4">
    //         <p className="product-name truncate">{product.name}</p>
    //         <Rating product={product} />

    //         <p>${product.price}</p>
    //       </div>

    //   </div>
    // </Link>

      <Link to={`/product/${product._id}`}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full object-cover object-center" src={product.image} alt={product.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 truncate">{product.name}</div>
            <Rating product={product} showNumReviews='true' />
            <p className="text-gray-700 text-base mt-2">${product.price}</p>
          </div>
          <div className="px-6 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {product.category}
            </span>
          </div>
        </div>
      </Link>
  );
};

export default Product;
