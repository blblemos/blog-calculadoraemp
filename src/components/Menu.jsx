import { search } from "../config/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Menu = ({cat}) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let res;
      try {
          res = await search('posts', 'cat', cat);
      } catch (err) {
        window.location.reload(false);
      }
      setPosts(res);
    };
    fetchData();
  }, []);
  return (
    <div className="menu">
      <h1>Você pode gostar</h1>
      {
        posts.map((post) =>(
          <div className="post" key={post.id}>
            <img src={post.img} alt="" />
            <Link className="link" to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
            </Link>
            <Link className="link-btn" to={`/post/${post.id}`}>Ler Mais...</Link>
          </div>
        ))
      }
    </div>
  )
}
export default Menu;