import { Link } from "react-router-dom";
import "./NavigationBar.scss";
import useLogin from "../hooks/useLogin";

function NavigationBar() {
  const login = useLogin();
  return (
    <section id="nav">
      <div className="header container">
        <div className="nav-bar">
          <div className="home-logo">
            <Link to="/">Gorda</Link>
          </div>
          <div className="nav-list">
            <ul>
              <li>
                {localStorage.Role !== undefined ? (
                  <>
                    {localStorage.Role === "1" ? (
                      <Link to="/mypage/admin">기관 관리</Link>
                    ) : (
                      <Link to="/mypage">마이페이지</Link>
                    )}
                  </>
                ) : (
                  ""
                )}
                <Link to="/dnlist">기부</Link>
                <Link to="/vote">투표</Link>
                {login.isConnected ? (
                  <>
                    <button className="login_btn" onClick={login.onDisconnect}>
                      로그아웃
                    </button>
                  </>
                ) : (
                  <>
                    <button className="login_btn" onClick={login.onConnect}>
                      로그인
                    </button>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NavigationBar;
