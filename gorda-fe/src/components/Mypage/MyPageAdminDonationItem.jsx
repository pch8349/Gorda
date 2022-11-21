import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import web3 from "../../smart-contract/vote-contract/web3";
import Campaign from "../../smart-contract/donate-contract/campaign";
import CircularProgress from "@mui/material/CircularProgress";

import "./MyPageAdminDonationItem.scss";

function MyPageAdminDonationItem(props) {
  const [expired, setExpired] = useState(false);
  const [error, setError] = useState("");
  const [requested, setRequested] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function onSubmitRequest() {
    const campaign = Campaign(props.account);

    try {
      setLoading(true);
      const accounts = await web3.eth.getAccounts();

      const result = await campaign.methods
        .createRequest("안녕하세요. 출금 요청합니다.")
        .send({
          from: accounts[0],
        });
      alert("성공적으로 요청했습니다.");
      setLoading(false);
    } catch (err) {
      setError(err.message);
      alert("네트워크 연결이 좋지 않습니다.");
    }
  }

  async function onFinalize() {
    try {
      setLoading(true);
      const accounts = await web3.eth.getAccounts();
      const campaign = Campaign(props.account);

      const result = await campaign.methods.finalizeRequest(0).send({
        from: accounts[0],
      });
      setLoading(false);
      navigate("/dnlist");
    } catch (err) {
      setError(err.message);
      alert("네트워크 연결이 좋지 않습니다.");
    }
  }

  useEffect(() => {
    const now = new Date();
    const deadline = new Date(props.end);
    if (deadline <= now) {
      if (props.eth >= props.target) {
        setExpired(true);
      }
    }

    async function getInfoSummary() {
      try {
        const campaign = Campaign(props.account);
        const result = await campaign.methods.getRequestsCount().call();
        if (result >= 1) {
          setRequested(true);
        }
      } catch (err) {
        setError(err.message);
      }
    }
    getInfoSummary();
  }, []);

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
      <div className="item_title">{props.title}</div>
      <div className="block">
        <div className="item_eth">
          {props.eth} / {props.target} eth
        </div>
        <div className="item_donation">
          &nbsp; {((props.eth / props.target) * 100).toFixed(1)}%&nbsp;참여
        </div>
        {expired && !requested ? (
          <div>
            <button
              onClick={onSubmitRequest}
              type="submit"
              className="mypage_request_btn"
            >
              출금 요청
            </button>
          </div>
        ) : null}
        {requested && expired ? (
          <div>
            <button
              type="button"
              onClick={onFinalize}
              className="mypage_finalize_btn"
            >
              출금
            </button>
          </div>
        ) : null}
      </div>

      <hr className="dashedhr" />
    </>
  );
}

export default MyPageAdminDonationItem;
