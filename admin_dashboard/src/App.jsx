import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Users from "./components/Users";
import Report from "./components/Report";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      errorElement: <Error />,
      children: [
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "report",
          element: <Report />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
