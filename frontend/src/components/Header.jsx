import homelogo from "../homelogo.png";
import { FiLogIn } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { useState } from "react";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";
// import { FaCaretDown } from "react-icons/fa";
import SearchBox from "./SearchBox";
import { resetCart } from "../slices/cartSlice";
import { Dropdown, DropdownItem } from "flowbite-react";

const Header = () => {
  // const [open, setOpen] = useState(false);
  // const [openAdmin, setOpenAdmin] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  // const totalCartItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate("/login");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="md:flex justify-between items-center px-8 py-4 bg-gray-200">
        
        <Link to="/">
          <div className="flex items-center">
            <img src={homelogo} alt="logo" className="h-4 md:h-12 mr-2" />
            <p className="font-bold text-orange-800 text-sm md:text-2xl">
              HOME DECOR
            </p>
          </div>
        </Link>

        <div className="flex flex-col md:flex md:flex-row mt-4 gap-4 text-2xl items-center">
          {/* SEARCH BOX */}
          <div className="mr-6 max-w-56">
            <SearchBox />
          </div>

          {/* CART  */}
          <div className="relative w-10 md:mr-6">
            <Link to="/cart" className="text-gray-700">
              <FaShoppingCart />
            </Link>
            {cartItems.length > 0 && (
              <div
                className="border -mt-1 absolute text-xs right-0 top-0 z-50 bg-red-400
            rounded-full w-5 h-5 flex items-center justify-center"
              >
                <p className="text-white">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </p>
              </div>
            )}
          </div>

          {/* ADMIN  */}
          <div className="relative">
            {userInfo && userInfo.isAdmin && (
              // <div>
              //   <div
              //     onClick={() => setOpenAdmin(!openAdmin)}
              //     type="button"
              //     className="flex items-center py-2 text-gray-700 text-base"
              //     id="user-menu-button"
              //     aria-expanded="false"
              //     aria-haspopup="true"
              //   >
              //     {/* <span class="absolute -inset-1.5"></span>
              //       <span class="sr-only">Open user menu</span> */}
              //     Admin <FaCaretDown className="ml-2" />
              //   </div>

              //   {openAdmin && (
              //     <div
              //       className="absolute md:right-0 z-10 w-32 origin-top-right rounded-md bg-white
              //       shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              //       role="menu"
              //       aria-orientation="vertical"
              //       aria-labelledby="user-menu-button"
              //     >
              //       <Link
              //         to="/admin/productlist"
              //         className="block px-4 py-2 my-2 text-sm text-gray-700
              //         hover:bg-gray-200 transition duration-150 ease-linear"
              //         role="menuitem"
              //         id="user-menu-item-0"
              //       >
              //         Products
              //       </Link>

              //       <Link
              //         to="/admin/userlist"
              //         className="block px-4 py-2 my-2 text-sm text-gray-700
              //         hover:bg-gray-200 transition duration-150 ease-linear"
              //         role="menuitem"
              //         id="user-menu-item-0"
              //       >
              //         Users
              //       </Link>

              //       <Link
              //         to="/admin/orderlist"
              //         className="block px-4 py-2 my-2 text-sm text-gray-700
              //         hover:bg-gray-200 transition duration-150 ease-linear"
              //         role="menuitem"
              //         id="user-menu-item-0"
              //       >
              //         Orders
              //       </Link>
              //     </div>
              //   )}
              // </div>

              <Dropdown label="Admin" dismissOnClick={false} color="dark">
                <Link to="/admin/productlist">
                  <DropdownItem>Products</DropdownItem>
                </Link>
                <Link to="/admin/userlist">
                  <DropdownItem>Users</DropdownItem>
                </Link>
                <Link to="/admin/orderlist">
                  <DropdownItem>Orders</DropdownItem>
                </Link>
              </Dropdown>
            )}
          </div>

          {/* USER  */}
          <div className="relative md:mr-8">
            {userInfo ? (
              // <div>
              //   <div
              //     onClick={() => setOpen(!open)}
              //     type="button"
              //     className="flex items-center py-2  text-gray-700 text-base"
              //     id="user-menu-button"
              //     aria-expanded="false"
              //     aria-haspopup="true"
              //   >
              //     {/* <span class="absolute -inset-1.5"></span>
              //       <span class="sr-only">Open user menu</span> */}
              //     {userInfo.name} <FaCaretDown className="ml-2" />
              //   </div>

              //   {open && (
              //     <div
              //       className="absolute md:right-0 z-10 w-32 origin-top-right rounded-md bg-white
              //       shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              //       role="menu"
              //       aria-orientation="vertical"
              //       aria-labelledby="user-menu-button"
              //       // tabindex="-1"
              //     >
              //       <Link
              //         to="/profile"
              //         className="block px-4 py-2 my-2 text-sm text-gray-700
              //         hover:bg-gray-200 transition duration-150 ease-linear"
              //         role="menuitem"
              //         // tabindex="-1"
              //         id="user-menu-item-0"
              //       >
              //         Your Profile
              //       </Link>

              //       <div
              //         onClick={logoutHandler}
              //         className="block px-4 py-2 my-2 text-sm text-gray-700
              //         hover:bg-gray-200 transition duration-150 ease-linear"
              //         role="menuitem"
              //         // tabindex="-1"
              //         id="user-menu-item-2"
              //       >
              //         Sign out
              //       </div>
              //     </div>
              //   )}
              // </div>
              <Dropdown
                label={userInfo.name}
                dismissOnClick={false}
                color="dark"
              >
                <Link to="/profile">
                  <DropdownItem>Your Profile</DropdownItem>
                </Link>

                <DropdownItem onClick={logoutHandler}>Sign out</DropdownItem>
              </Dropdown>
            ) : (
              <div className="flex justify-center">
                <Link to="/login">
                  <FiLogIn/>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
