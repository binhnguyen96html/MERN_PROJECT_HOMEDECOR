import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import Alert from "../components/Alert";
import { FaTimes } from "react-icons/fa";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: ordersApiSlice, isLoading, error } = useGetMyOrdersQuery();
  //   console.log(ordersApiSlice)

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          ...userInfo,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className="px-8 grid grid-cols-1 md:grid-cols-4 ">
      <div className="md:col-span-1">
        <h1 className="mb-4">User Profile</h1>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={submitHandler} className="space-y-2">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-1">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  type="password"
                  className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="pt-4 ">
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>

            {loadingUpdateProfile && <Spinner />}
          </form>
        </div>
      </div>

      <div className="text-center mt-12 md:col-span-3 ml-6">
        <h1 className="mb-6">My Orders</h1>

        {isLoading ? (
          <Spinner />
        ) : error ? (
          <Alert color="red" content={error?.data?.message || error.error} />
        ) : (
          <div className="relative overflow-x-auto scrollbar-hide">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    total
                  </th>
                  <th scope="col" className="px-6 py-3">
                    paid
                  </th>
                  <th scope="col" className="px-6 py-3">
                    delivered
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {ordersApiSlice.map((order) => (
                  <tr
                    key={order._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{order._id}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScreen;
