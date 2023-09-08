import { useState, useEffect, useContext } from "react";
import { RiEditBoxFill, RiDeleteBin7Fill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import { getById, deleteInfo,deleteImg } from "../config/api";
import moment from "moment";
import 'moment/locale/pt';
import { AuthContext } from "../context/authContext";
import MetaTags from "react-meta-tags";

const Simgle = () => {
  const [post, setPost] = useState({});
  const [userPost, setUserPost] = useState({});
  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      let res; 
      let user; 
      try {
        if (postId) {
          res = await getById('posts',postId); 
          user = await getById('user', res.uid);
          if (res) {
            setPost(res);
            setUserPost(user);
          }else{
            navigate('/page-not-found');
          }
        }else{
          navigate('/page-not-found');
        }
      } catch (err) {
        window.location.reload(false);
      }
      
    };
    fetchData();
  }, [postId]);
  const handleDelete = async () => { 
    if (deleteInfo('posts', postId)) {
      alert("Deletado com Sucesso");
      deleteImg(post.img);
      navigate('/');
    }
  };
  function createMarkup() {
    return {__html: post.desc};
  }
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html");
    var descricao_txt = doc.body.textContent;
    if (descricao_txt.length > 500) {
      descricao_txt = descricao_txt.substr(0,500)+"...";
    }
    return descricao_txt;
  }
  return (
    <div className="single">
      <MetaTags>
        <title>{post.title}</title>
        <meta id="meta-description" name="description" content={getText(post.desc)}/>
      </MetaTags>
      <div className="content">
        <img
          src={post?.img}
          alt=""
        />
        <h1 id="title-post">{post.title}</h1>
        <div id="content-post" dangerouslySetInnerHTML={createMarkup()}/>
        <div className="user">
          <img
            src={userPost?.img}
            alt=""
          />
          <div className="info">
            <span>{userPost?.userName}</span>
            <p className="userName">Postado {moment(post.date).locale('pt').fromNow()}</p>
          </div>
          {currentUser != null && currentUser.uid === userPost?.uid && 
            (<div className="edit">
              <Link to={`/write?edit=${postId}`} state={{...post,postId}}>
                <RiEditBoxFill className="img" />
              </Link>
              <RiDeleteBin7Fill onClick={handleDelete} className="img" />
            </div>)
          }
        </div>
      </div> 
      {post.cat && <Menu cat={post.cat}/>}
    </div>
  );
};
export default Simgle;
