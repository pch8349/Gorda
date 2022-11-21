import { useState, useEffect } from "react";
import apiInstance from "../../api/Index";
import "./MyPageDonationItem.scss";
import web3 from "../../smart-contract/vote-contract/web3";
import Campaign from "../../smart-contract/donate-contract/campaign";
import CircularProgress from "@mui/material/CircularProgress";

function MyPageDonationItem(props) {
  const api = apiInstance();
  const [error, setError] = useState("");
  const [myDonationIdx, setMyDonationIdx] = useState(0);
  const [myDonationTitle, setMyDonationTitle] = useState("");
  const [requested, setRequested] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onApprove() {
    try {
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(myDonationIdx);

      const result = await campaign.methods.approveRequest(0).send({
        from: accounts[0],
      });
      setLoading(false);

      alert("성공적으로 승인했습니다.");
    } catch (err) {
      setError(err.message);
      alert("네트워크 연결이 좋지 않습니다.");
    }
  }

  useEffect(() => {
    api
      .get(`api/donation/${props.idx}`)
      .then((res) => {
        setMyDonationIdx(res.data.data.donationAccount);
        setMyDonationTitle(res.data.data.donationName);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    async function getRequests(id) {
      try {
        const campaign = Campaign(id);
        const result = await campaign.methods.getRequestsCount().call();
        if (result >= 1) {
          setRequested(true);
        }
      } catch (err) {
        setError(err.message);
        console.log(err);
      }
    }
    if (myDonationIdx) {
      getRequests(myDonationIdx);
    }
  }, [myDonationIdx]);

  return (
    <>
      {loading ? (
        <CircularProgress
          style={{
            position: "fixed",
            top: "47%",
            left: "47%",
          }}
          size={100}
        />
      ) : null}
      <div className="item_date">{props.date}</div>
      <div className="item_title">{myDonationTitle}</div>
      <div className="block">
        <div className="item_eth">{props.eth} eth</div>
        <div className="item_donation">참여 기부</div>
        {requested ? (
          <button
            type="button"
            onClick={onApprove}
            className="mypage_approve_btn"
          >
            승인
          </button>
        ) : (
          <button type="button" className="mypage_approve_btn_block">
            미완료
          </button>
        )}
      </div>

      <hr className="dashedhr" />
    </>
  );
}

export default MyPageDonationItem;
