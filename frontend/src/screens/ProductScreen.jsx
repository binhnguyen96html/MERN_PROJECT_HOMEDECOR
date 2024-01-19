// import { useEffect, useState } from "react";
import Rating from "../components/Rating";
// import products from "../data";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../slices/productsApiSlice";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
// import axios from "axios";
import { toast } from "react-toastify";
import Meta from "../components/Meta";



const ProductScreen = () => {
  // const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    // console.log({ ...product, qty });
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();

      refetch();
      toast.success("Review created!");

      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  // const product = products.find((product) => product._id === productId);

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     const { data } = await axios.get(`/api/products/${productId}`);
  //     setProduct(data);
  //   };
  //   fetchProduct();
  // }, [productId]);

  return (
    <>
      <div>
        <Link to="/">
          <button className="border rounded-lg bg-slate-100 p-2 ">
            Go Back
          </button>
        </Link>

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Alert
            color="bg-red-500"
            message="Error"
            content={error?.data?.message || error.error}
          />
        ) : (
          <>
          <Meta title={product.name} />
            <div className="grid sm:grid-cols-1 md:grid-cols-3 mt-4 gap-4">
              <div className="max-h-100 overflow-hidden ">
                <img
                  className="rounded object-contain h-full w-full"
                  src={product.image}
                  alt="imageProduct"
                />
              </div>

              <div>
                <p 
                className="product-name text-3xl text-gray-700">
                  {product.name}
                </p>
                <hr />
                <div>
                  <Rating product={product} showNumReviews="true" />
                </div>
                <hr />
                <p>${product.price}</p>
                <hr />
                <p>{product.description}</p>
              </div>

              <div>
                <div
                  className="w-64 grid grid-cols-2 gap-2 border mx-auto 
                rounded-md shadow-lg px-6 py-6 text-sm"
                >
                  <p>Price:</p>
                  <p>${product.price}</p>

                  <hr className="col-span-2" />

                  <p>Status:</p>
                  <p>
                    {product.countInStock >= 1 ? "In Stock" : "Out of Stock"}
                  </p>

                  <hr className="col-span-2" />

                  {product.countInStock > 0 && (
                    <>
                      <label>Qty:</label>
                      <select
                        onChange={(e) => setQty(Number(e.target.value))}
                        value={qty}
                        type="select"
                        className="border rounded p-2"
                      >
                        {[...Array(product.countInStock).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                      <hr className="col-span-2" />
                    </>
                  )}

                  <div className="col-span-2">
                    <button
                      onClick={addToCartHandler}
                      type="button"
                      disabled={product.countInStock === 0}
                      className="border py-2 px-4 bg-gray-300 rounded
                    hover:bg-gray-400 transition ease-in-out duration-150"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>


            {/* WRITE REVIEWS FOR PRODUCT  */}
            <div className="mt-10 grid grid-cols-2">
              <div>
                <h2
                  className="text-4xl font-bold leading-9 tracking-tight text-gray-600
                  p-5 bg-gray-200"
                >
                  Reviews
                </h2>

                {product.reviews.length === 0 && (
                  <Alert color="blue" content="No Reviews" />
                )}

                {product.reviews.map((review) => (
                  <div 
                  key={review._id}
                  className="border mt-5 mb-5 ml-10 p-3 rounded bg-gray-100"
                  >
                    <p className="font-bold mb-1">{review.name}</p>
                    <Rating product={review} />
                    <p className="mt-3 text-sm">{review.comment}</p>
                  </div>
                ))}

                <h2
                  className="text-2xl font-bold leading-9 tracking-tight text-gray-600
                  py-3 px-5 bg-gray-200"
                >
                  Write a Customer Review
                </h2>

                {userInfo ? (
                  <div className="mt-5 ml-10">
                    <form onSubmit={submitHandler} className="space-y-4">
                      <div className="mb-10 h-10 w-72 min-w-[200px]">
                        <label className="block font-medium leading-6 text-gray-700">
                          Rating
                        </label>
                        <select
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                          className="mt-2 h-full w-full rounded border border-blue-gray-500 text-sm"
                        >
                          <option value="">Select...</option>
                          <option value="b1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-medium leading-6 text-gray-700">
                          Comment
                        </label>

                        <div className="mt-2">
                          <textarea
                            onChange={(e) => setComment(e.target.value)}
                            value={comment}
                            row="6"
                            className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="mt-10">
                        <button
                          disabled={loadingProductReview}
                          type="submit"
                          className="rounded-md bg-gray-600 px-5 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Post
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <Alert color="blue" content="Sign" />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ProductScreen;
