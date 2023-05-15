import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../pages";
import Home from "../pages/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
  },
]);

const index = () => {
  return <RouterProvider router={router} />;
};

export default index;
