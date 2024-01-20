import { Link } from "react-router-dom";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { useGetOrdersQuery } from "../../slices/ordersApiSlice";
import { FaTimes } from "react-icons/fa";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();
  // console.log(orders);

  return (
    <div className="mx-10">
      <h2 className="text-4xl mb-6 font-medium text-gray-600">Orders</h2>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Alert color="red" content={error?.data?.message || error.error} />
      ) : (
        <>
          <div className="relative overflow-x-auto scrollbar-hide">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    USER
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DATE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TOTAL
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PAID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    DELIVERED
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{order._id}</td>
                    <td className="px-6 py-4">
                      {order.user && order.user.name}
                    </td>
                    <td className="px-6 py-4">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="px-6 py-4">{order.totalPrice}</td>
                    <td className="px-6 py-4">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0,10)
                      ) : (
                        <FaTimes className="text-red-500" />
                      )}
                    </td>
                    <td>
                      <Link to={`/order/${order._id}`}>
                        <button className="rounded border py-1 px-2 bg-gray-200 text-gray-800 hover:bg-gray-500 transition duration-150 ease-linear">
                          Detail
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderListScreen;
