import "./VoteListItem.scss";
import { useState, useEffect } from "react";
import Vote from "../../smart-contract/vote-contract/vote";
import web3 from "../../smart-contract/vote-contract/web3";
import { Link } from "react-router-dom";
import apiInstance from "../../api/Index";

function VoteListItem(props) {
  const [error, setError] = useState("");
  const [canVote, setCanVote] = useState(true);
  const api = apiInstance();
  async function onClickBtn() {
    try {
      const accounts = await web3.eth.getAccounts();

      const vote = Vote(props.voteAddress);

      vote.options.address = props.voteAddress;
      const result = await vote.methods.vote(props.foundationAccount).send({
        from: accounts[0],
      });

      api.put(`api/user/vote/${localStorage.idx}`);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    const vote = Vote(props.voteAddress);
    async function checkIfVoted() {
      const accounts = await web3.eth.getAccounts();
      const check = await vote.methods.isVote().call();

      if (check.includes(accounts[0])) {
        setCanVote(false);
      }
    }
    checkIfVoted();
  }, [props]);
  return (
    <>
      <div className="vote_item_card">
        <Link to={`/vote/detail/${props.foundationIdx}`}>
          <div
            className="cardImg"
            style={{ backgroundImage: `url(${props.foundationLogo})` }}
          ></div>
        </Link>

        <div className="card_content">
          <div className="card_header">
            <div className="list_num">{props.foundationName}</div>
          </div>
          <div className="card_btn">
            {canVote ? (
              <button onClick={onClickBtn} className="vote_btn">
                투표하기
              </button>
            ) : (
              <button onClick={onClickBtn} className="vote_btn" disabled>
                투표 불가
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default VoteListItem;
