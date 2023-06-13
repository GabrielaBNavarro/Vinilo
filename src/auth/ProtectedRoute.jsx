import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...resto }) => {
  const token = localStorage.getItem("token") || null;
  return (
    <Route
      {...resto}
      render={(props) => {
        if (token) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};
export default ProtectedRoute;
