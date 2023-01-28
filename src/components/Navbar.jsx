import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="Calculadora do Empreendedor" />
        </div>
        <div className="links">
          <Link className="link" to="/?cat=precificacao">
            <h6>Precificação</h6>
          </Link>
          <Link className="link" to="/?cat=financas">
            <h6>Finanças</h6>
          </Link>
          <Link className="link" to="/?cat=impostos">
            <h6>Impostos</h6>
          </Link>
          <span>Bruno</span>
          <span>Logout</span>
          <span className="write">
            <Link className="link" to="/write">New</Link>
          </span>
        </div>
      </div>
    </div>
  )
}
export default Navbar;