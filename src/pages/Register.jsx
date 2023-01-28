import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import {newUser} from "../config/api";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");
  const [btnValue,setBtnValue] = useState("Registrar");
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  //Função para enviar form.
  const handleSubmit = async (e) =>{
    e.preventDefault();
    setBtnValue('Aguarde...');
    let log = await newUser(username,email, password, img);
    if (log == null) {
      navigate('/login');
    }else{
      setErr(log);
      setBtnValue('Registrar');
    }
  }
  return (
    <div className="auth">
      <h1>Registrar-se</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          type="text"
          placeholder="Usuário"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          placeholder="Senha"
        />
        {err && <p>{err}</p>}
        <button >{btnValue}</button>
        <span>
          Já tem uma conta?
          <br />
          <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};
export default Register;
