import "./FoundationAdmin.scss";
import NavigationBar from "../components/NavigationBar";
import MyPageAdminDonationList from "../components/Mypage/MyPageAdminDonationList";

function FoundationAdmin() {
  return (
    <>
      <NavigationBar />
      <div className="admin_container">
        <div className="admin_header">
          <div className="admin_tag">관리자</div>
          <div className="admin_name">Admin 계정</div>
        </div>
        <MyPageAdminDonationList />
        <div className="btn_container">
          <a href="/vote/detail/">
            <div className="go_foundation">기관 상세페이지 이동</div>
          </a>
          <a href="/mypage/admin/new">
            <div className="regist_btn">새 모금 등록</div>
          </a>
        </div>
      </div>
    </>
  );
}

export default FoundationAdmin;
