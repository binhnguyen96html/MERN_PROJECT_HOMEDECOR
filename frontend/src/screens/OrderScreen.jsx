import { useParams } from "react-router-dom";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../slices/ordersApiSlice";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
import { usePayPalScriptReducer, PayPalButtons } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  //Get data to fetch order
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = 
    usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
    // console.log(order.isDelivered)

  const { userInfo } = useSelector((state) => state.auth);

  //PAYPAL FUNCTION-------------------------------------------------
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypalDispatch, paypal, loadingPayPal, errorPayPal]);

  //   async function onApproveTest() {
  //     await payOrder({ orderId, details: { payer: {} } });
  //     refetch();
  //     toast.success("Order is paid");
  //   }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details }).unwrap();
        refetch();
        toast.success("Payment successful");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  //-----------------------------------------------------------------
  const deliverOrderHandler = async() => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order delivered')
    } catch (error) {
      toast.error(error?.data?.message || error.message)
    }
  }




  return isLoading ? (
    <Spinner />
  ) : error ? (
    <Alert color="red" content={error?.data?.message || error.error} />
  ) : (
    <div className="px-8">
      <h1 className="mb-4">
        <span className="font-bold">Order:</span> {order._id}
      </h1>

      <div className="md:grid md:grid-cols-5">
        <div className="col-span-3">
          {/* SHIPPING  */}
          <div className="border-b mb-4">
            <h2 className="font-bold">Shipping</h2>
            <div className="text-sm mt-2">
              <p>
                <span className="font-bold">Name: </span> {order.user.name}
              </p>
              <p>
                <span className="font-bold">Email: </span> {order.user.email}
              </p>
              <p>
                <span className="font-bold">Address: </span>
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}{" "}
              </p>
            </div>

            <div className="mx-4">
              {order.isDelivered ? (
                <Alert
                  color="blue"
                  content={`Delivered on ${order.deliveredAt}`}
                />
              ) : (
                <Alert color="red" content="Not Delivered" />
              )}
            </div>
          </div>

          {/* PAYMENT METHOD  */}
          <div className="border-b mb-4">
            <h2 className="font-bold">Payment Method</h2>
            <div className="mt-2 text-sm">
              <p>
                <span className="font-bold">Method: </span>{" "}
                {order.paymentMethod}
              </p>
            </div>

            <div className="mx-4">
              {order.isPaid ? (
                <Alert color="blue" content={`Paid on ${order.paidAt}`} />
              ) : (
                <Alert color="red" content="Not Paid" />
              )}
            </div>
          </div>

          {/* ORDER ITEMS  */}
          <div className="mt-4">
            <h2 className="font-bold">Order Items</h2>

            <div className="m-4 border">
              {order.orderItems.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-5 gap-4 p-4 rounded-md items-center text-sm"
                >
                  <div className="col-span-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10"
                    />
                  </div>
                  <div className="col-span-2">
                    <p>{item.name}</p>
                  </div>
                  <div className="col-span-2">
                    <p>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY  */}
        <div className="col-span-2 mx-8 mt-8">
          <div className="border rounded shadow p-4 overflow-hidden">
            <div className="border-b ">
              <h2 className="font-bold m-6">Order Summary</h2>
            </div>

            <div className="border-b py-4 text-sm text-gray-900">
              <div className="px-6 flex justify-between ">
                <p>Items:</p>
                <p>${order.itemsPrice}</p>
              </div>
              <div className="px-6 flex justify-between ">
                <p>Shipping:</p>
                <p>${order.shippingPrice}</p>
              </div>
              <div className="px-6 flex justify-between ">
                <p>Tax:</p>
                <p>${order.taxPrice}</p>
              </div>
              <div className="px-6 flex justify-between ">
                <p>Total:</p>
                <p>${order.totalPrice}</p>
              </div>
            </div>

            {/* PAY ORDER PLACEHOLDER  */}
            <div>
              {!order.isPaid && (
                <div>
                  {loadingPay && <Spinner />}
                  {isPending ? (
                    <Spinner />
                  ) : (
                    <div className="px-6 md:px-0">
                      {/* <button
                        onClick={onApproveTest}
                        className="p-2 m-2 border rounded"
                      >
                        Test Pay Order
                      </button> */}

                      <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        onError={onError}
                      ></PayPalButtons>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* MARK AS DELIVERED PLACEHOLDER  */}
            {loadingDeliver && <Spinner/>}
            {userInfo && userInfo.isAdmin && order.isPaid && 
            !order.isDelivered && (
              <div className="p-6 border-t">
                <button
                type="button"
                onClick={deliverOrderHandler}
                className="p-3 rounded bg-gray-700 text-white
                hover:bg-gray-600 transition duration-150 ease-linear"
                >
                  Mark As Delivered
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
