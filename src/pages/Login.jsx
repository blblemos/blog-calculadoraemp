import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {login} from "../config/api";
import { useCookies } from 'react-cookie';
import { AuthContext } from "../context/authContext";
import MetaTags from "react-meta-tags";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnValue,setBtnValue] = useState("Login");
  const [err, setErr] = useState(null);
  const [cookies, setCookie] = useCookies(['access_token']);
  const navigate = useNavigate();
  const { loginContext } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnValue('Aguarde...');
    let sendLogin = await login(email, password); 
    if (sendLogin.log) {
      setCookie('access_token', sendLogin.content);
      await loginContext();
      navigate('/');
    }else{
      setErr(sendLogin.content);
      setBtnValue('Login');
    }
    return;
    
  };
  return (
    <div className="auth">
      <MetaTags>
        <title>Login</title>
      </MetaTags>
      <form onSubmit={handleSubmit}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" />
        {err && <p>{err}</p>}
        <button>{btnValue}</button>
        <span>  
          Não tem uma conta?
          <br />
        </span>
      </form>
    </div>
  )
}
export default Login;