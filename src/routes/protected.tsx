import { Navigate, RouteProps } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
import { useLocation } from "react-router-dom";
import useUser from "@/stores/user";

type PrivateRouteProps = {
  Component: React.ComponentType<RouteProps>;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ Component, ...rest }) => {
  const location = useLocation();
  const pathlogin = location?.pathname === "/login";

  const { isLoggedIn } = useUser(
    useShallow((state) => ({
      isLoggedIn: state.isLoggedIn,
    }))
  );

  return isLoggedIn ? (
    pathlogin ? (
      <Navigate to="/" />
    ) : (
      <Component {...rest} />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
