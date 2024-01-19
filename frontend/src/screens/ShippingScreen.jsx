import { useState } from "react";
import FormContainer from "../components/FormContainer";
import {useDispatch, useSelector} from 'react-redux'
import { saveShippingAddress } from "../slices/cartSlice";
import {useNavigate} from 'react-router-dom'
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address, city, postalCode, country}));
    navigate('/payment')
  }

  return (
    <FormContainer>

      <CheckoutSteps step1 step2/>

      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
        
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Shipping
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={submitHandler}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Address
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  type="text"
                  required
                  className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  type="text"
                  required
                  className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Postal Code
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setPostalCode(e.target.value)}
                  value={postalCode}
                  type="text"
                  required
                  className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setCountry(e.target.value)}
                  value={country}
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
                Continue
              </button>
            </div>

          </form>
        </div>
      </div>
    </FormContainer>
  );
};

export default ShippingScreen;
