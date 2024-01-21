import { MdAddCircle } from "react-icons/md";
import { useCreateProductMutation, useDeleteProductMutation, useGetProductsQuery } from "../../slices/productsApiSlice";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import { FaEdit, FaTrash} from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import {toast} from 'react-toastify';
import Paginate from "../../components/Paginate";

const ProductListScreen = () => {
  const {pageNumber} = useParams();

  const { data, isLoading, error, refetch } = 
    useGetProductsQuery({pageNumber});
  
  const [createProduct, {isLoading: loadingCreate}] = 
    useCreateProductMutation()

  const [deleteProduct, {isLoading: loadingDelete}] = 
    useDeleteProductMutation();

  const createProductHandler = async() => {
    if(window.confirm("Do you want to create a new product?")){
      try {
        await createProduct();
        toast.success("Product created!");
        refetch();
      } catch (error) {
        toast.error(error?.data?.message)
      }
    }
  }

  const deleteHandler = async (id) => {
    if(window.confirm("Are you sure to delete the product?")){
      try {
        await deleteProduct(id);
        refetch();
      } catch (error) {
        toast.error(error.data.message)
      }
    }
  }

  return (
    <div className='mx-10'>
      <div className="flex justify-between mb-6">
        <h2 className="text-4xl font-medium text-gray-600">Products</h2>
        
        <button 
        onClick={createProductHandler}
        className="flex justify-between items-center px-6 border rounded bg-gray-300">
          <MdAddCircle className="mr-2" /> Create Product
        </button>

      </div>

      {loadingCreate && <Spinner />}
      {loadingDelete && <Spinner />}

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <Alert color="red" content={error.data.message} />
        // <Alert color="red" content='Error' />
        ) : (
        <>
          <div className="relative overflow-x-auto scrollbar-hide">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-gray-400 text-white">
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    NAME
                  </th>
                  <th scope="col" className="px-6 py-3">
                    PRICE
                  </th>
                  <th scope="col" className="px-6 py-3">
                    CATEGORY
                  </th>
                  <th scope="col" className="px-6 py-3">
                    BRAND
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>

              <tbody>
                {data.products.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white even:bg-gray-100 border-b"
                  >
                    <td className="px-6 py-4">{product._id}</td>
                    <td 
                    className="px-6 py-4 max-w-56">
                      {product.name}
                    </td>
                    <td className="px-6 py-4">{product.price}</td>
                    <td className="px-6 py-4">
                      {product.category}
                    </td>
                    <td className="px-6 py-4">
                      {product.brand}
                    </td>
                    <td className="px-6 py-4 flex justify-between items-center mx-auto align-center ">
                      
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <FaEdit />
                      </Link>

                      <Link>
                        <FaTrash 
                        onClick={() => deleteHandler(product._id)}
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Paginate
            page={data.page}
            pages={data.pages}
            pageName='productList'
          />
        </>
      )}

    </div>
  );
};

export default ProductListScreen;
