import routes from "./route";
import { RouterProvider as Router } from "react-router-dom";

const App = () => {
  return <Router router={routes} />;
};

export default App;
