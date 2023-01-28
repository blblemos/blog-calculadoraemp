import { RouterProvider , createBrowserRouter, Outlet} from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Simgle from "./pages/Single";
import Write from "./pages/Write";
import "./style/style.scss";

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/write",
        element: <Write/>,
      },
      {
        path: "/post/:id",
        element: <Simgle/>,
      },
    ]
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  }
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/> 
      </div>
    </div>
  );
}

export default App;
