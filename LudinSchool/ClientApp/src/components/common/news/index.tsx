import { MdOutlineArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";

const NewsCard = () => {
  return (
    <div className="news">
      <img src="/Images/7b9f41477da5f240b24bd67216dd7.jpg" alt="" />
      <span className="title">Lorem ipsum</span>
      <div className="dateCateg">
        <span className="newsCateg">Category</span>
        <span className="newsDate">01.01.2022</span>
      </div>

      <p className="smallContent">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus,
        voluptatibus nulla. Quis optio distinctio vel nemo obcaecati maxime,
        sequi voluptatum tempora modi unde neque aliquam.
      </p>

      <Link to={"/"} className="newsReadMoreContainer">
        <MdOutlineArrowForwardIos className="icon" />
        <span>Read more</span>
      </Link>
    </div>
  );
};
export default NewsCard;
