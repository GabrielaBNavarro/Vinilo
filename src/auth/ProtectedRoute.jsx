import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...resto }) => {
  const token = localStorage.getItem("token") || null;
  console.log(token);
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
