import { useState, useEffect } from "react";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import {useSelector, useDispatch} from 'react-redux'
import { setCredentials } from "../slices/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from '../components/Spinner';


const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();

    const {userInfo} = useSelector((state) => state.auth);

    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';
    // console.log('re', redirect)

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo])

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({email, password}).unwrap(); //login with POST email, password
            dispatch(setCredentials({...res}));//luu thong tin vao cookie, local storage
            navigate(redirect)
        } catch (error) {
            toast.error(error?.data?.message || error.error)
        }
    }


  return (
    <FormContainer>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
          onSubmit={submitHandler}
          className="space-y-6" >
            <div>
              <label
                // for="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                //   for="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    // to={}
                    className="font-semibold text-gray-600 hover:text-gray-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>

            {isLoading && <Spinner />}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
              className="font-semibold leading-6 text-gray-600 hover:text-gray-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
