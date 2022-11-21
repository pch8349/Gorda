import { useEffect, useState } from "react";
import "./DonatorRanking.scss";
import { getUserRanking } from "../../api/Users";
import web3 from "../../smart-contract/vote-contract/web3";

function DonatorRanking() {
  const [userRanking, setUserRanking] = useState([]);

  const rankingGet = async () => {
    await getUserRanking(
      (response) => {
        setUserRanking(response.data.data);
      },
      (err) => {
        console.log("유저랭킹정보 에러", err);
      }
    );
  };

  useEffect(() => {
    rankingGet();
  }, []);

  return (
    <>
      <div className="rank_container">
        <div className="rank_header">기부자 랭킹</div>
        <div className="rank_item">
          {userRanking.map((a, index) => {
            return (
              <div className="item_i">
                <div>
                  <i className="bx bx-medal"></i> {a.userNickname}
                </div>
                <div>
                  {web3.utils.fromWei(String(parseInt(a.userAmount)), "ether")}
                  eth
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default DonatorRanking;
