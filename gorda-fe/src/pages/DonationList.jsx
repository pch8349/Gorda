import { useState } from "react";
import DonationListCard from "../components/Donation/DonationListCard";
import DonatorRanking from "../components/Donation/DonatorRanking";
import NavigationBar from "../components/NavigationBar";
import ShopBanner from "../components/Donation/ShopBanner";
import UnicefBanner from "../components/Donation/UnicefBanner";
import "./DonationList.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import apiInstance from "../api/Index";
import web3 from "../smart-contract/vote-contract/web3";

function DonationList() {
  const api = apiInstance();
  const [count, setCount] = useState(47398495);
  const [infos, setInfos] = useState([]);

  const pointCount = count.toLocaleString("ko-KR");

  useEffect(() => {
    api
      .get("api/donation/readall")
      .then((res) => {
        setInfos(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="donationlist_container">
        <div className="page_header">
          <div className="header_p">
            <div>당신의 착한 마음을</div>
            <div>
              Gorda가 응원합니다
              <span>
                <i className="bx bxs-heart"></i>
              </span>
            </div>
          </div>
          <div className="donationCount">
            <i className="bx bxs-heart-circle"></i>
            <div className="countbox">기부 {pointCount}건</div>
          </div>
        </div>
        <div className="test">
          <div className="page_card">
            {infos.map((item, key) => {
              return (
                <Link to={`/detail/${item.donationIdx}`}>
                  <DonationListCard
                    category={item.donationSubject}
                    imgURL={item.donationLogo}
                    title={item.donationName}
                    description={item.donationContent}
                    target={web3.utils.fromWei(
                      item.donationTargetEth.toString(),
                      "ether"
                    )}
                  />
                </Link>
              );
            })}
          </div>
          <div className="banner_card">
            <UnicefBanner />
            <ShopBanner />
            <DonatorRanking />
          </div>
        </div>
      </div>
    </>
  );
}

export default DonationList;
