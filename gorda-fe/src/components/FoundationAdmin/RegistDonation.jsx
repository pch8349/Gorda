import "./RegistDonation.scss";
import RegistList from "./RegistList";

function RegistDonation() {
  const regist_count = 2;
  return (
    <>
      <div className="regist_container">
        <div className="regist_title">
          등록한 모금 <span>{regist_count}</span>
        </div>
        <RegistList />
        <RegistList />
      </div>
    </>
  );
}

export default RegistDonation;
