import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./Components/RootLayout";
import LoginForm from "./Components/LoginForm";
import PatientsList from "./Components/PatientsList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <LoginForm /> },
      { path: "/patients", element: <PatientsList /> },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
