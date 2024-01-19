import { Link } from "react-router-dom";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <div className="max-w-lg m-auto">
      <ul className="flex justify-between">
        {step1 ? (
          <li className="mr-3">
            <Link
              to="/login"
              className="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
            >
              Sign In
            </Link>
          </li>
        ) : (
          <li disabled className="mr-3">
            <div className="inline-block py-2 px-4 text-gray-400 cursor-not-allowed">
              Sign In
            </div>
          </li>
        )}

        {step2 ? (
          <li className="mr-3">
            <Link
              to="/shipping"
              className="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
            >
              Shipping
            </Link>
          </li>
        ) : (
          <li disabled className="mr-3">
            <div className="inline-block py-2 px-4 text-gray-400 cursor-not-allowed">
              Shipping
            </div>
          </li>
        )}

        {step3 ? (
          <li className="mr-3">
            <Link
              to="/payment"
              className="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
            >
              Payment
            </Link>
          </li>
        ) : (
          <li disabled className="mr-3">
            <div className="inline-block py-2 px-4 text-gray-400 cursor-not-allowed">
              Payment
            </div>
          </li>
        )}

        {step4 ? (
          <li className="mr-3">
            <Link
              to="/placeorder"
              className="inline-block border border-white rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-2 px-4"
            >
              Place Order
            </Link>
          </li>
        ) : (
          <li disabled className="mr-3">
            <div className="inline-block py-2 px-4 text-gray-400 cursor-not-allowed">
              Place Order
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default CheckoutSteps;
