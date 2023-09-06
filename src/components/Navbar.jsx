import { useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import { AuthContext } from "../context/authContext";
import { useCookies } from 'react-cookie';

const Navbar = () => {
  const { currentUser, logoutContext } = useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
  const logout = async () => {
    await logoutContext();
    removeCookie('access_token');
  }
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to={'/'}>
            <img src={Logo} alt="Calculadora do Empreendedor" />
          </Link>
        </div>
        <div className="links">
          <Link className="link" to="/?precificacao">
            <h6>Precificação</h6>
          </Link>
          <Link className="link" to="/?financas">
            <h6>Finanças</h6>
          </Link>
          <Link className="link" to="/?impostos">
            <h6>Impostos</h6>
          </Link>
          <span>{currentUser?.displayName}</span>
          {currentUser && <span onClick={logout}>Logout</span>}
          {currentUser && <span className="write">
            <Link className="link" to="/write">
              New
            </Link>
          </span>}
          
        </div>
      </div>
    </div>
  );
};
export default Navbar;
