import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from "../../slices/productsApiSlice";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('')
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, {isLoading: loadingUpdate}] =
    useUpdateProductMutation();

  const [uploadProductImage, {isLoading: loadingUpload}] = 
    useUploadProductImageMutation();

  useEffect(() => {
    if(product){
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [product])

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedProduct = {
      productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    };

    const result = await updateProduct(updatedProduct);
    if(result.error){
      toast.error(result.error)
    }else{
      toast.success('Product updated!');
      refetch();
      navigate('/admin/productlist')
    }
  }

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error)
    }
  }

  return (
    <>
      <Link to="/admin/productlist">
        <button className="border rounded-lg bg-slate-100 p-2 ">Go Back</button>
      </Link>

      <FormContainer>
        <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
          
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-4xl font-bold leading-9 tracking-tight text-gray-600">
              Edit Product
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
                className="space-y-4"
              >

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
                    Price
                  </label>

                  <div className="mt-2">
                    <input
                      onChange={(e) => setPrice(e.target.value)}
                      value={price}
                      type="number"
                      required
                      className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                {/* IMAGE INPUT PLACEHOLDER  */}
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-700">
                    Image
                  </label>

                  <div className="mt-2">
                    <input
                      onChange={(e) => setImage(e.target.value)}
                      value={image}
                      type="text"
                      placeholder="Enter Image Url"
                      required
                      className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <input 
                    type="file"
                    label='Choose file' 
                    onChange={uploadFileHandler}
                    className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  {loadingUpload && <Spinner />}
                </div>


                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-700">
                    Brand
                  </label>

                  <div className="mt-2">
                    <input
                      onChange={(e) => setBrand(e.target.value)}
                      value={brand}
                      type="text"
                      required
                      className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-700">
                    Count In Stock
                  </label>

                  <div className="mt-2">
                    <input
                      onChange={(e) => setCountInStock(e.target.value)}
                      value={countInStock}
                      type="number"
                      required
                      className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-700">
                    Category
                  </label>

                  <div className="mt-2">
                    <input
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                      type="text"
                      required
                      className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>


                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-700">
                    Description
                  </label>

                  <div className="mt-2">
                    <input
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      type="text"
                      required
                      className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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

export default ProductEditScreen;
