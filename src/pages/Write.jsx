import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const Write = () => {
  const [value, setValue] = useState('');
  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder="Título" />
        <div className="editorContainer">
          <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publicar</h1>
          <span>
            <b>Status: </b> Rascunho
          </span>
          <span>
            <b>Visibilidade: </b> Publico
          </span>
          <input style={{display: 'none'}} type="file" id='file'/>
          <label className='file' htmlFor="file">Carregar Imagem</label>
          <div className="buttons">
            <button>Salvar o Rascunho</button>
            <button>Carregar</button>
          </div>
        </div>
        <div className="item">
          <h1>Categorias</h1>
          <div className="cat">
            <input type="radio" name='cat' value='precificacao' id='precificacao'/>
            <label htmlFor="precificacao">Precificação</label>
          </div>
          <div className="cat">
            <input type="radio" name='cat' value='financas' id='financas'/>
            <label htmlFor="precificacao">Finanças</label>
          </div>
          <div className="cat">
            <input type="radio" name='cat' value='impostos' id='impostos'/>
            <label htmlFor="precificacao">Impostos</label>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Write;