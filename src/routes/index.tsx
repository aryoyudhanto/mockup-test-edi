import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../pages";
import Home from "../pages/Home";
import Pokemon from "../pages/Pokemon";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/pokemon",
    element: <Pokemon />,
  },
]);

const index = () => {
  return <RouterProvider router={router} />;
};

export default index;
