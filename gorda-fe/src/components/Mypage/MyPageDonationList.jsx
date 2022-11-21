import { useEffect, useState } from "react";
import MyPageDonationItem from "./MyPageDonationItem";
import "./MyPageDonationList.scss";
import apiInstance from "../../api/Index";
import web3 from "../../smart-contract/vote-contract/web3";

function MyPageDonationList() {
  const api = apiInstance();
  const [infos, setInfos] = useState([]);

  useEffect(() => {
    const userIdx = localStorage.getItem("idx");
    api
      .get(`api/my_donation/user/${userIdx}`)
      .then((res) => {
        setInfos(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="list_title">기부내역({infos.length}건)</div>
      <div className="list_box">
        {infos.map((item, key) => {
          return (
            <MyPageDonationItem
              idx={item.donationIdx}
              date={item.myDonationDate.substr(0, 10)}
              title={item.myDonationName}
              eth={web3.utils.fromWei(String(item.myDonationAmount), "ether")}
            />
          );
        })}
      </div>
    </>
  );
}

export default MyPageDonationList;
