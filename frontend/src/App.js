import Header from "./components/Header";
// import HomeScreen from "./screens/HomeScreen";
import { Outlet } from "react-router-dom";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <Header />

      <div className="p-8 mx-auto ">
        <Outlet />
      </div>

      <ToastContainer />
    </>
  );
};

export default App;
