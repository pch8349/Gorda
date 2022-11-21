import { Link } from "react-router-dom";
import "./HomeNav.scss";
function HomeNav() {
  return (
    <section id="header">
      <div className="header container">
        <div className="nav-bar">
          <div className="home-logo">
            <Link to="/">Gorda</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeNav;
