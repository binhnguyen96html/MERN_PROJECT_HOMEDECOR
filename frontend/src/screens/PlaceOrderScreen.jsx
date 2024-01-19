import { useDispatch, useSelector } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps";
import { Link, useNavigate } from "react-router-dom";
import { clearCartItems } from "../slices/cartSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Alert from "../components/Alert";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import Spinner from '../components/Spinner'


const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const [createOrder, {isLoading, error}] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [navigate, cart.shippingAddress.address, cart.paymentMethod]);


  const placeOrderHandler = async () => {
    try {
        const res = await createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }).unwrap();

      dispatch(clearCartItems());

      navigate(`/order/${res._id}`)

    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-3 mt-2">
            <h2 className="mt-6 text-xl font-medium text-gray-900">Shipping</h2>
            <div className="text-sm mt-2">
              <strong>Address:</strong> {cart.shippingAddress.address},{" "}
              {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{" "}
              {cart.shippingAddress.country}
            </div>

            <h2 className="mt-6 text-xl font-medium text-gray-900 border-t pt-4">
              Payment Method
            </h2>
            <div className="text-sm mt-2">
              <strong>Payment Method:</strong>{" "}
              {cart.paymentMethod.paymentMethod}
            </div>

            <h2 className="mt-6 text-xl font-medium text-gray-900 border-t pt-4">
              Order Items
            </h2>

            {cart.cartItems.length === 0 ? (
              <Alert color="blue" content="Your card is empty" />
            ) : (
              <ul>
                {cart.cartItems.map((item, index) => (
                  <li key={index} className="flex py-6 border-b">
                    <div className="h-12 w-12 ">
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
                          qty: {item.qty}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )} 
          </div>


          {cart.cartItems.length !== 0 && (
            <div className="col-span-2 mt-8 px-4 text-sm">
              <div className="border py-6 flex flex-col items-center rounded shadow">
                <h2 className="text-2xl font-medium text-gray-900 ">
                  Order Summary
                </h2>

                <div className="flex justify-between py-4 px-8 mt-4 border-t w-full">
                  <p>Items:</p>
                  <p>${cart.itemsPrice}</p>
                </div>

                <div className="flex justify-between py-4 px-8 mt-4 border-t w-full">
                  <p>Shipping:</p>
                  <p>${cart.shippingPrice}</p>
                </div>

                <div className="flex justify-between py-4 px-8 mt-4 border-t w-full">
                  <p>Tax (15%):</p>
                  <p>${cart.taxPrice}</p>
                </div>

                <div className="flex justify-between py-4 px-8 mt-4 border-t w-full">
                  <p>Total:</p>
                  <p>${cart.totalPrice}</p>
                </div>

                <div className="flex justify-between py-4 px-8 mt-4 border-t w-full">
                  {error && <Alert color='red' content={error} />}
                </div>

                <div className="w-full border-t flex ">
                  <button
                  type="button"
                    onClick={placeOrderHandler}
                    className="mx-auto mt-6 rounded-md bg-gray-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700 transition ease-in-out duration-150"
                  >
                    Place Order
                  </button>
                </div>

                {isLoading && <Spinner />}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
