import { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { editPost, newPost, uploadImg, deleteImg } from "../config/api";
import "react-quill/dist/quill.snow.css";
import { AuthContext } from "../context/authContext";
import moment from "moment";
import MetaTags from "react-meta-tags";
const Write = () => {
  const state = useLocation().state;
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [img, setImg] = useState(null); 
  const [imgUrl, setImgUrl] = useState("");
  const [cat, setCat] = useState("");
  const [btn, setBtn] = useState(true);
  const {currentUser} = useContext(AuthContext);
  var src;
  if(state === null){
    if (img != null) {
      src = URL.createObjectURL(img);
    }
  } ;
  useEffect(() => {
    setTitle(state?.title || '');
    setValue(state?.desc || '');
    setImgUrl(state?.img || '');
    setCat(state?.cat || '');
  },[state]);
  const handleSubmit = async (e) => {
    setBtn(false);
    e.preventDefault();
    if (state === null) {
      try {
        const res = await newPost(
          moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          value,
          img,
          title,
          currentUser.uid,
          cat
        );
        if (res) {
          navigate("/");
        } else {
          setBtn(true);
        }
      } catch (err) {}
    }else{
      try{
        const res = await editPost(
          value,
          img != null ? await uploadImg(img, title) : imgUrl,
          title,
          currentUser.uid,
          cat,
          state.postId);
          if (res) {
            navigate("/");
          } else {
            setBtn(true);
          }
      }catch(err){
        return err;
      }
      if ((state.title !== title) && (img !== null)) {
        deleteImg(imgUrl);
      }
    }
  };
  const viewImg = () => {
    if (state != null) {
      if (img === null) {
        return (<img src={imgUrl} alt={imgUrl} />)
      }else{
        src = URL.createObjectURL(img);
        return (<img src={src} alt={src} />)
      }
    }else{
      return (<img src={src} alt={src} />)
    }
  }
  return (
    <div className="add">
      <MetaTags>
        <title>Write</title>
      </MetaTags>
      <div className="content">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          {viewImg()}
          
        </div>
        <div className="item">
          <h1>Publicar</h1>
          <span>
            <b>Status: </b> Rascunho
          </span>
          <span>
            <b>Visibilidade: </b> Publico
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            Carregar Imagem
          </label>
          {btn ? 
            <div className="buttons">
              <button>Salvar o Rascunho</button>
              <button onClick={handleSubmit}>Publicar</button>
            </div>
            :
            <div className="buttons">
              <button disabled>Salvar o Rascunho</button>
              <button disabled >Publicar</button>
            </div>
          }
        </div>
        <div className="item">
          <h1>Categorias</h1>
          <div className="cat">
            <input
              type="radio" checked={cat === "precificacao"}
              name="cat"
              value="precificacao"
              id="precificacao"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="precificacao">Precificação</label>
          </div>
          <div className="cat">
            <input
              type="radio" checked={cat === "noticias"}
              name="cat"
              value="noticias"
              id="noticias"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="precificacao">Notícias</label>
          </div>
          <div className="cat">
            <input
              type="radio" checked={cat === "outros"}
              name="cat"
              value="outros"
              id="outros"
              onChange={(e) => setCat(e.target.value)}
            />
            <label htmlFor="precificacao">Outros</label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Write;
