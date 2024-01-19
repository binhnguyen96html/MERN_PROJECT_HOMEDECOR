import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: loadingUpdate }] = 
    useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
        await updateUser({userId, name, email, isAdmin});
        toast.success('User updated successfully!');
        refetch();
        navigate('/admin/userlist')
    } catch (error) {
        toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Link to="/admin/userlist">
        <button className="border rounded-lg bg-slate-100 p-2 ">Go Back</button>
      </Link>

      <FormContainer>
        <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-4xl font-bold leading-9 tracking-tight text-gray-600">
              Edit User
            </h2>
          </div>

          {loadingUpdate && <Spinner />}

          {isLoading ? (
            <Spinner />
          ) : error ? (
            <Alert color="red" content={error.data.message} />
          ) : (
            <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
              <form 
              onSubmit={submitHandler} 
              className="space-y-4">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-700">
                    Name
                  </label>

                  <div className="mt-2">
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      required
                      className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-700">
                    Email
                  </label>

                  <div className="mt-2">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      required
                      className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="mt-2 flex align-center">
                  <label 
                  className="text-sm font-medium leading-6 text-gray-700"
                  >
                    Is Admin
                  </label>

                  <div>
                    <input
                      onChange={(e) => setIsAdmin(e.target.value)}
                      type="checkbox"
                      checked={isAdmin}
                      className="ml-2 rounded-md"
                    />
                  </div>
                </div>


                <div className="pt-4">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
