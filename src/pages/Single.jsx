import { RiEditBoxFill, RiDeleteBin7Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";

const Simgle = () => {
  return (
    <div className="single">
      <div className="content">
        <img
          src="https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        <div className="user">
          <img
            src="https://avatars.githubusercontent.com/u/52580590?s=400&u=7fb8c7bc8b28deaa78dae83dedf0503c5305035c&v=4"
            alt=""
          />
          <div className="info">
            <span>Bruno Lemos</span>
            <p1>Postado 2 dias atras</p1>
          </div>
          <div className="edit">
            <Link to={`/write?:edit=2`}>
              <RiEditBoxFill className="img" />
            </Link>
            <RiDeleteBin7Fill className="img" />
          </div>
        </div>
        <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit</h1>
        <p>
          <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
          </p>
          
          <p>
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using 'Content here, content here', making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
          </p>
        </p>
      </div>
      <Menu/>
    </div>
  );
};
export default Simgle;
