import { RouterProvider , createBrowserRouter, Outlet} from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Simgle from "./pages/Single"
import Write from "./pages/Write"
import Protected from "./components/Protected"
import { AuthContext } from "./context/authContext";
import "./style/style.scss"
import { useContext } from "react"

function App() {
  const {currentUser} = useContext(AuthContext);
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
          element: 
            <Protected isSignedIn={currentUser}>
              <Write/>
            </Protected>,
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
    }
  ]);
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router}/> 
      </div>
    </div>
  );
}

export default App;
