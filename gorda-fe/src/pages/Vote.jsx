import "./Vote.scss";
import NavigationBar from "../components/NavigationBar";
import { useState, useEffect } from "react";
import apiInstance from "../api/Index";
import VoteListItem from "../components/Vote/VoteListItem";
import factory from "../smart-contract/vote-contract/factory";
import VoteItem from "../smart-contract/vote-contract/vote";

function Vote() {
  let datemonth = new Date().getMonth() + 1;
  const [open, setOpen] = useState(false);
  const [voteList, setVoteList] = useState([0]);
  const [thisMonthVote, setThisMonthVote] = useState([0]);
  const [foundation, setFoundation] = useState([]);
  const api = apiInstance();
  const voteItem = VoteItem(voteList[voteList.length - 1]);

  useEffect(() => {
    if (voteList) {
      async function callThisMonthVote() {
        const summary = await voteItem.methods.show().call();
        setThisMonthVote(summary);
      }
      callThisMonthVote();
    }
  }, [voteList]);

  useEffect(() => {
    async function callVoteList() {
      const tmp = await factory.methods.getDeployedVotes().call();
      setVoteList(tmp);
    }

    callVoteList();
  }, []);

  useEffect(() => {
    api
      .get("api/foundation")
      .then((res) => {
        setFoundation(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <NavigationBar />
      <div className="vote_container">
        <div className="vote_header">
          <br />

          <div className="vote_title">이달의 기관</div>
        </div>
        <div className="hardcord">
          <div className="hardcord_img"></div>
          <div className="hardcord_p">
            지난 <span>9월</span>에 선정된 이달의 기관은 <span>굿네이버스</span>
            입니다.
          </div>
        </div>
        <hr className="hr_box" />
        <div className="vote_title">
          <div>지난 한달 동안</div>
          <div>여러분이 기부한 곳 중</div>
          <div>
            가장 <span className="title_box">투명하고 만족스러운</span> 기관에
          </div>
          <div>
            <span className="title_color">투표</span>해주세요
          </div>
          <a
            target="_blank"
            className="link_title"
            href={`https://goerli.etherscan.io/address/${
              voteList[voteList.length - 1]
            }`}
          >
            이더스캔에서 투표 현황 확인하기
          </a>
        </div>

        <hr className="hr_box_2" />
        <div className="vote_list_p">지난 달 모금에 참여한 기관</div>
        <div className="vote_list">
          {foundation &&
            foundation.map((item, key) => {
              return (
                <VoteListItem
                  foundationName={item.foundationName}
                  foundationAccount={item.foundationAccount}
                  foundationLogo={item.foundationLogo}
                  foundationIdx={item.foundationIdx}
                  voteAddress={voteList[0]}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Vote;
