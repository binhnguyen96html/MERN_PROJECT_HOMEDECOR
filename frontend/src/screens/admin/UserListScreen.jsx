import {useDeleteUserMutation, useGetUsersQuery} from '../../slices/usersApiSlice';
import Alert from '../../components/Alert';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import {toast} from 'react-toastify';


const UserListScreen = () => {

    const {data: users, isLoading, error, refetch} = 
        useGetUsersQuery();

    const [deleteUser, {isLoading: loadingDelete}] = 
        useDeleteUserMutation();

    const deleteHandler = async(id) => {
        if(window.confirm("Are you sure to delete this user?")){
            try {
                await deleteUser(id);
                toast.success("Delete user successfully!");
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.error)
            }
        }
    }

  return (
    <div className='mx-10'>
    <div className="flex justify-between">
      <h2 className="text-4xl mb-6 font-medium text-gray-600">Users</h2>
    </div>

    {loadingDelete && <Spinner />}

    {isLoading ? (
      <Spinner />
    ) : error ? (
      <Alert color="red" content={error} />
    ) : (
      <>
        <div className="relative overflow-x-auto scrollbar-hide">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="even:bg-red-200" >
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  NAME
                </th>
                <th scope="col" className="px-6 py-3">
                  EMAIL
                </th>
                <th scope="col" className="px-6 py-3">
                  ADMIN
                </th>
                <th scope="col" className="px-6 py-3">
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="bg-white even:bg-red-200 border-b"
                >
                  <td className="px-6 py-4">{user._id}</td>
                  <td className="px-6 py-4">
                    {user.name}
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    {user.isAdmin ? (
                        <FaCheck className='text-green-500' />
                    ) : (
                        <FaTimes className='text-red-500' />
                    )}
                  </td>

                  <td className="px-6 py-4 flex justify-between items-center mx-auto align-center ">
                    
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <FaEdit />
                    </Link>

                    <Link>
                      <FaTrash 
                      onClick={() => deleteHandler(user._id)}
                      />
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
  )
}

export default UserListScreen