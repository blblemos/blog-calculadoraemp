import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAll, search } from "../config/api";
import MetaTags from "react-meta-tags";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const cat = useLocation().search; console.log(cat);
  useEffect(() => {
    const fetchData = async () => {
      let res;
      try {
        if (cat) {
          res = await search('posts', 'cat', cat.replace('?',''));
        }else{
          res = await getAll("posts");
        }
      } catch (err) {
        window.location.reload(false);
      }
      setPosts(res);
    };
    fetchData();
  }, [cat]);

  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html");
    var descricao_txt = doc.body.textContent;
    if (descricao_txt.length > 500) {
      descricao_txt = descricao_txt.substr(0,500)+"...";
    }
    return descricao_txt;
  }

  const returnCat = () => {
    switch (cat) {
      case "?financas":
        return "Finanças"
      case "?precificacao":
        return "Precificação"
      case "?impostos":
        return "Impostos"
    
      default:
        break;
    }
  }
  return (
    <div className="home">
      <MetaTags>
        <title>Blog - {!cat ? " Calculadora do Empreendedor" : returnCat()}</title>
        <meta id="meta-description" name="description" content={"Aprenda sobre empreendedorismo, precificação, finanças e impostos com nosso blog especializado. Obtenha dicas e orientações para otimizar sua estratégia de negócios e alcançar o sucesso financeiro."}/>
      </MetaTags>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt={post.title} />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc) }</p>
              <Link className="link-btn" to={`/post/${post.id}`}>Ler Mais...</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;
