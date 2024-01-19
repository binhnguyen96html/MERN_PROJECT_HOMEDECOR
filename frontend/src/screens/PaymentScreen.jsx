import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {shippingAddress} = useSelector((state) => state.cart);

    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping')
        }
    }, [shippingAddress, navigate])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod({paymentMethod}));
        navigate('/placeorder')
    }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Payment
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full max-w-sm">
          <form
            onSubmit={submitHandler}
            className="space-y-4"
          >
            <div>
              <label className="block font-medium leading-6 text-gray-900">
                Select Payment Method
              </label>

              <div className="flex items-center mt-2">
                <input
                onChange={(e) => setPaymentMethod(e.target.value)}
                  checked
                  id="default-radio-2"
                  type="radio"
                  value="Paypal"
                  name="default-radio"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  // for="default-radio-2"
                  className="ml-2 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  PayPal or Credit Card
                </label>
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

export default PaymentScreen;
