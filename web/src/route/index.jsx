import { createBrowserRouter } from "react-router-dom";
import Index from "../pages/Index";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./routing/PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute component={Index} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default routes;
