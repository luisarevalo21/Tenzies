import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="navbar">
      <h1 onClick={handleClick} className="tenzies-header">
        Tenzies
      </h1>

      <ul className="list">
        <li>
          <NavLink to="/">Play!</NavLink>
        </li>
        <li>
          <NavLink to="/topscores">High Scores</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
