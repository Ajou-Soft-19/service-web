import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Test from "./pages/Test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/test",
    element: <Test />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
