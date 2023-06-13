
import ProtectedRoute from "./auth/ProtectedRoute";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute path="/" component={Home} />
      </Switch>
    </Router>

  );
}

export default App;
