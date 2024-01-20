// import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import Product from "../components/Product";
import Spinner from "../components/Spinner";
// import products from "../data";
// import axios from 'axios';
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Paginate from "../components/Paginate";
import { Link } from "react-router-dom";
import Carosel from "../components/Carosel";
import FooterComponent from "../components/FooterComponent";


const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    pageNumber,
    keyword,
  });

  // console.log(products);
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const {data} = await axios.get('/api/products');
  //     setProducts(data);
  //   }

  //   fetchProducts();
  // }, []);

  console.log(data);

  return (
    <>
      {!keyword ? (
        <Carosel />
      ) : (
        <Link to="/">
          <button className="border rounded-lg bg-slate-100 p-2 ">
            Go Back
          </button>
        </Link>
      )}

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
          <h1 className="text-4xl uppercase font-bold text-gray-600 mb-6 mt-12">
            Latest Products
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {data.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>

          <Paginate
            page={data.page}
            pages={data.pages}
            pageName="homeScreen"
            keyword={keyword}
          />
        </>
      )}
      <FooterComponent />
    </>
  );
};

export default HomeScreen;
