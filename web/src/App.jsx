import { useState, useEffect } from "react";
import routes from "./route";
import { RouterProvider as Router } from "react-router-dom";
import { LOGOUT } from "../redux/actions/types";
import { Provider } from "react-redux";
import { loadUser } from "../redux/actions/auth";
import store from "../redux/store";
import setAuthToken from "./utils/setAuthToken";
import { Loader } from "rsuite";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    store.dispatch(loadUser()).then(() => setLoading(false));

    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return loading ? (
    <Loader className="m-10" />
  ) : (
    <Provider store={store}>
      <Router router={routes} />
    </Provider>
  );
};

export default App;
