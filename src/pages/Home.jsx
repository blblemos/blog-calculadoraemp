import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAll, search } from "../config/api";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const cat = useLocation().search;
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
  return (
    <div className="home">
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
