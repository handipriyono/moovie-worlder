import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "@/pages/SignIn";
import Dashboards from "@/pages/Dashboards";
import Favorites from "@/pages/Favorites";
import PrivateRoute from "./protected";

const router = createBrowserRouter([
  { path: "/", element: <PrivateRoute Component={Dashboards} /> },
  { path: "/dashboard", element: <PrivateRoute Component={Dashboards} /> },
  { path: "/favorites", element: <PrivateRoute Component={Favorites} /> },
  { path: "/login", element: <SignIn /> },
]);

export default function RouteList() {
  return <RouterProvider router={router} />;
}
