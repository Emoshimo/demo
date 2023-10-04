import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ContactDetail from "./pages/ContactDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/contact_detail",
    element: <ContactDetail />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
