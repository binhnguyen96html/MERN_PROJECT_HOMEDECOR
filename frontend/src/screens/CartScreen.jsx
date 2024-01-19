import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart, removeCart } from "../slices/cartSlice";

const dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeCartHandler = (id) => {
    dispatch(removeCart(id))
  }

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div>
      <h2 className="text-2xl font-medium text-gray-900">Shopping Cart</h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="col-span-3 mt-2 p-4">
          <ul>
            {cartItems.map((item, index) => (
              <li key={index} className="flex py-6 border-b">
                <div className="h-24 w-24 ">
                  <img
                    className="h-full w-full object-cover object-center rounded"
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                <div className=" ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3 className="underline underline-offset-1 hover:text-gray-600 transition ease-linear duration-150">
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </h3>
                      <p className="ml-4">${item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {item.category}
                    </p>
                  </div>

                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p className="text-gray-500">
                      <label>Qty:</label>
                      <select
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                        type="select"
                        className="border rounded p-2 ml-2"
                        value={item.qty}
                      >
                        {[...Array(item.countInStock).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </p>

                    <div className="flex">
                      <button
                      onClick={()=>removeCartHandler(item._id)}
                        type="button"
                        className="text-xs font-medium text-red-400 hover:text-red-600 transition ease-in-out duration-150"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 mt-8">
          <div className="border p-6 rounded shadow">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </p>
              <p>
                {dollarUS.format(
                  cartItems.reduce(
                    (acc, item) => acc + item.qty * item.price,
                    0
                  )
                )}
              </p>
            </div>
            <p className="mt-0.5 text-xs text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
              <button
                onClick={checkoutHandler}
                className="w-full flex items-center justify-center rounded-md border border-transparent bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 transition ease-in-out duration-150"
              >
                Checkout
              </button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                  <button
                    type="button"
                    className="ml-2 font-medium text-gray-500 hover:text-gray-700 transition ease-in-out duration-150"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
