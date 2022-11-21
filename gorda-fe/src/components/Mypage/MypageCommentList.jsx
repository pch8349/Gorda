import { useEffect, useState } from "react";
import { deleteComment, getComment } from "../../api/Comment";
import { getDonationByIdx } from "../../api/Donation";
import "./MypageCommentList.scss";

function MypageCommentList(index) {
  const [commentContent, setCommentContent] = useState("");
  const [donationName, setDonationName] = useState("");
  const [donationResitTime, setDonationRegistTime] = useState("");
  const [donationCommentIdx, setDonationCommentIdx] = useState("");

  const getMyDonation = async () => {
    await getDonationByIdx(
      { donationIdx: index.donationIdx },
      (response) => {
        setDonationName(response.data.data.donationName);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const getCommentCnt = async () => {
    await getComment(
      { userIdx: localStorage.getItem("idx") },
      (response) => {
        setCommentContent(
          response.data.data[index.index].donationCommentContent
        );
        setDonationRegistTime(
          response.data.data[index.index].donationCommentDate
        );
        setDonationCommentIdx(
          response.data.data[index.index].donationCommentIdx
        );
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const OnClick = async () => {
    await deleteComment(
      { donationCommentIdx: donationCommentIdx },
      (response) => {
        window.location.replace("/mypage");
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    getCommentCnt();
    getMyDonation();
  }, []);

  return (
    <>
      <div className="comment_list">
        <div className="box_tag">모금함</div>
        <div className="comment_list_title">{donationName}</div>
      </div>
      <div className="comment_box">{commentContent}</div>
      <div className="comment_time_like">
        <div className="comment_time">{donationResitTime.substring(0, 10)}</div>
        <div className="comment_like">
          <div className="comment_delete" onClick={OnClick}>
            삭제
          </div>
        </div>
      </div>
    </>
  );
}
export default MypageCommentList;
