import HomeNav from "../components/HomePage/HomeNav";

import "./Home.scss";

import useLogin from "../hooks/useLogin";

function Home() {
  const login = useLogin();
  return (
    <>
      <HomeNav />
      <section id="home">
        <div className="home_container">
          <div className="home_paragraph">세상을 고르게 만드는 힘</div>
          <div className="home_paragraph">"고르다"와 함께하세요</div>
          {!login.isConnected && (
            <button className="login_btn" onClick={login.onConnect}>
              계좌 연결하기
            </button>
          )}
          {login.isConnected && (
            <button className="login_btn" onClick={login.onDisconnect}>
              계좌 연결해제
            </button>
          )}
          <a href="#donation" className="next_btn">
            <i className="bx bx-down-arrow-alt"></i>
          </a>
        </div>
      </section>
      <section id="donation">
        <div className="donation_container">
          <div className="donation_paragraph">
            <h1> ‘기부’는 복잡하고 어려운 것이 아닌,</h1>
            <h1>일상의 소비처럼 가깝고, 꼭 필요한 것으로 변화했습니다.</h1>
            <p>
              "고르다"를 통해, 모금 현장에서 우리가 함께 고민해야 할 지점을
              살펴봅시다.
            </p>
            <a href="/dnlist">
              <button className="more_btn">더 알아보기</button>
            </a>
          </div>
          <a href="#poll" className="next_btn_2">
            <i className="bx bx-down-arrow-alt"></i>
          </a>
        </div>
      </section>

      <section id="poll">
        <div className="poll_container">
          <div className="poll_paragraph">
            <h1>당신의 기관을 선택하세요!</h1>
            <p>"고르다"는 여러분에 손에서 기부금이 나간 순간 부터</p>
            <p>마지막까지 필요한 곳으로 보낼 것을 약속드립니다.</p>
            <a href="/vote">
              <button className="go_btn">투표 바로가기</button>
            </a>
          </div>
          <div className="test">
            <a href="#home" className="next_btn_3">
              <i className="bx bx-up-arrow-alt"></i>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
