import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "./App";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import Wrapper from "./components/Wrapper/Wrapper";
import ProfileView from "./pages/ProfileView";
import Navbar from "./components/Navbar/Navbar";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarWrapper />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/profile",
        element: (
          <Wrapper>
            <ProfileView />
          </Wrapper>
        ),
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      { path: "/signin", element: <Signin /> },
    ],
  },
]);

function NavbarWrapper() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
