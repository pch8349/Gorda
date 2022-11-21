import "./AdminDetail.scss";
function AdminDetail() {
  const donation_count = 5;
  const wait_donation = 3;
  return (
    <>
      <div className="admin_detail">
        <div className="admin_detail_container">
          <div className="admin_container_detail">
            <div className="admin_total_detail">
              <div>등록한 기부 수</div>
              <span>{donation_count}회</span>
            </div>
            <div className="admin_total_detail">
              <div>등록 대기 기부 수</div>
              <span>{wait_donation}회</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDetail;
