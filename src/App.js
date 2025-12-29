import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
} from "react-router-dom";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AboutPage from "./pages/AboutPage";

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <MainPage />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Header />
        <LoginPage />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Header />
        <RegisterPage />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Header />
        <AboutPage />
      </>
    ),
  },
]);

function Header() {
  return (
    <header style={{ padding: "10px", background: "#f0f0f0" }}>
      <nav>
        <Link to="/" style={{ margin: "0 10px" }}>Main</Link>
        <Link to="/login" style={{ margin: "0 10px" }}>Login</Link>
        <Link to="/register" style={{ margin: "0 10px" }}>Register</Link>
        <Link to="/about" style={{ margin: "0 10px" }}>About</Link>
      </nav>
    </header>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;