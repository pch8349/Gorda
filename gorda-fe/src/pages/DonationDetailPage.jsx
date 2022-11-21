import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { deleteComment } from "../api/Comment";
import NavigationBar from "../components/NavigationBar";
import "./DonationDetailPage.scss";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import Modal from "@mui/material/Modal";
import Campaign from "../smart-contract/donate-contract/campaign";
import CircularProgress from "@mui/material/CircularProgress";
import Web3 from "web3";
import web3 from "../smart-contract/donate-contract/web3";
import apiInstance from "../api/Index";
import { putDonation } from "../api/Donation";
import { postMyDonation } from "../api/MyDonation";
import { putUserDonate } from "../api/Users";
import { getUserInfo } from "../api/Users";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "473px",
  // height: '550px',
  bgcolor: "background.paper",
  borderRadius: 5,
  border: "none",
  p: "58px 30px 44px 27px",
};

function DonationDetailPage() {
  const api = apiInstance();

  const [loading, setLoading] = useState(false);
  const [infos, setInfos] = useState({
    donationIdx:
      "f8ef9f089d14a37e9c540fd903a7543e661a80cdd63f3e3e2d00f79558c9b9da",
    foundationIdx:
      "1f42d8a83d86b4e2c91f0f66c3dc79b35bad41dce2ae86f996d48556b9c153df",
    donationLogo:
      "http://newsimg.hankookilbo.com/2017/01/09/201701091433285687_1.jpg",
    donationName: "기아대책",
    donationSubject: "hunger",
    donationAccount: "0xeb25b55CFA479F7a7C9e8A618f42e9F241AE5c24",
    donationContent: "홈리스를 위한 기부",
    donationLike: 0,
    donationTargetEth: 3000000000000000000,
    donationCurrentEth: 3000000000000000000,
    donationStartDate: "2022-10-05T06:15:25.658",
    donationEndDate: "2022-11-02T00:00:00",
  });
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [amountInUSD, setAmountInUSD] = useState();
  const id = useParams();
  const [foundation, setFoundation] = useState([]);
  const campaignItem = Campaign(infos.donationAccount);
  campaignItem.options.address = campaignItem.options.campaignid;

  const { handleSubmit, register, formState, reset, getValues } = useForm({
    mode: "onChange",
  });

  const [wallet_eth, setWallet_eth] = useState(0);
  const [progress, setProgress] = useState(0);
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  const [openTap, setOpenTap] = useState(false);
  const handleTap = () => {
    setOpenTap((present) => !present);
  };

  const [cheerCount, setCheerCount] = useState(0);
  const upCheerCount = () => {
    setCheerCount(cheerCount + 1);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = async () => {
    setOpen(true);
    try {
      const currentProvider = detectCurrentProvider();
      if (currentProvider) {
        if (currentProvider !== window.ethereum) {
          console.log(
            "Non-Ethereum browser detected. You should consider trying MetaMask!"
          );
        }

        // 메타마스크 연결
        await currentProvider.request({ method: "eth_requestAccounts" });

        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account); // Get wallet balance
        ethBalance = web3.utils.fromWei(ethBalance, "ether"); //Convert balance to wei
        setWallet_eth(ethBalance);
        if (userAccount.length === 0) {
          console.log("Please connect to meta mask");
        } else {
          console.log(ethBalance);
        }
      }
    } catch (err) {
      console.log(
        "There was an error fetching your accounts. Make sure your Ethereum client is configured correctly."
      );
    }
  };
  const handleClose = () => setOpen(false);
  const [inputValue, setInputValue] = useState(0);
  const resetBtn = () => {
    setInputValue(0);
  };

  const testinput = (e) => {
    if (e.target.value < 0) {
      setInputValue(0);
      alert("음수는 입력하지 말아욧");
    } else {
      setInputValue(e.target.value);
    }
  };

  const detectCurrentProvider = () => {
    let provider;
    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    return provider;
  };
  async function onSubmit(data) {
    alert("정말 기부하시겠습니까?");

    try {
      const myIdx = localStorage.getItem("idx");

      const accounts = await web3.eth.getAccounts();
      setLoading(true);
      setOpen(false);

      const result = await campaignItem.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(String(data.donation), "ether"),
      });
      setAmountInUSD(null);
      reset("", {
        keepValues: false,
      });
      setIsSubmitted(true);

      await putDonation(
        {
          donationIdx: infos.donationIdx,
          donAmount: web3.utils.toWei(String(data.donation), "ether"),
        },
        (response) => {
          setComment(response.data.data);
        },
        (err) => {
          console.log(err);
        }
      );

      await postMyDonation(
        {
          donationIdx: infos.donationIdx,
          myDonationAmount: web3.utils.toWei(String(data.donation), "ether"),
          myDonationName: infos.donationName,
          userIdx: localStorage.getItem("idx"),
        },
        (response) => {
          console.log("성공", response);
        },
        (err) => {
          console.log("postMyDonation 실패", err);
        }
      );

      await putUserDonate(
        {
          userIdx: localStorage.getItem("idx"),
          donateAmount: web3.utils.toWei(String(data.donation), "ether"),
        },
        (response) => {
          console.log("유저 도네이트 갱신 성공", response);
        },
        (err) => {
          console.log("유저 도네이트 갱신 실패", err);
        }
      );

      alert("기부자님의 따뜻한 마음이 퍼져나갑니다.");
      setLoading(false);
      window.location.reload();
    } catch (err) {
      alert("스마트 컨트랙트 오류입니다. 기부금을 제대로 입력하셨나요?");
      setError(err.message);
      console.log(err);
    }
  }

  const [comment, setComment] = useState("");
  const [comm, setComm] = useState([]);
  const comment_list_count = comm.length;
  const handlePreventDefault = (e) => {
    api
      .post(`/api/donation_comment/regist`, {
        donationCommentContent: comment,
        donationIdx: params.campaignid,
        userIdx: localStorage.idx,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    api
      .get(`/api/donation_comment/donation/${id.campaignid}`)
      .then((res) => {
        setComm(res.data.data);
      })
      .catch((e) => {});
  }, []);

  const [valueLength, setValueLength] = useState(0);
  const checkValueLength = (e) => {
    setValueLength(e.target.value.length);
    setComment(e.target.value);
  };
  let params = useParams();

  const commentPost = () => {
    console.log("gd");
  };

  //댓글 가져오기
  useEffect(() => {
    api.get(``);
  });

  useEffect(() => {
    api
      .get(`api/donation/${id.campaignid}`)
      .then((res) => {
        setInfos(res.data.data);
        setProgress(
          (res.data.data.donationCurrentEth / res.data.data.donationTargetEth) *
            100
        );
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  useEffect(() => {
    if (infos) {
      api
        .get(`api/foundation/${infos.foundationIdx}`)
        .then((res) => {
          setFoundation(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [infos]);

  const deleteMyComment = async (e) => {
    let key = e.target.value;
    await deleteComment(
      { donationCommentIdx: key },
      (response) => {
        window.location.replace(`/detail/${id.campaignid}`);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const [userName, setUserName] = useState("");
  const getNickName = async () => {
    await getUserInfo(
      { userIdx: localStorage.getItem("idx") },
      (response) => {
        setUserName(response.data.data.userNickname);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    getNickName();
  }, []);

  const clip = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <>
      <NavigationBar />
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
      <div className="detail_header">
        <div className="header_title">{infos.donationName}</div>
        <div className="header_foundation">by {foundation.foundationName}</div>
        <a
          target="_blank"
          className="header_link"
          href={`https://goerli.etherscan.io/address/${infos.donationAccount}`}
        >
          이더스캔에서 기부 현황 확인하기
        </a>
      </div>
      <div className="detail_container">
        <div className="box_notion">
          <div className="notion_top">
            참여하면 Gorda에서 뱃지 SoulBound를 제공!
          </div>
          <div className="notion_bottom">
            기부하시는 분께는 모두 Honor 뱃지를 드립니다.
          </div>
        </div>
        <p className="p_content">{infos.donationContent}</p>
        <div className="eth_box">
          <div className="now_eth">
            {web3.utils.fromWei(infos.donationCurrentEth.toString(), "ether")}
            eth
          </div>
          <div className="goal_eth">
            {web3.utils.fromWei(infos.donationTargetEth.toString(), "ether")}{" "}
            eth 목표
          </div>
          <div className="goal_progress">
            <Box sx={{ flexGrow: 1 }}>
              <div className="testPro">
                <div className="pro_gress">{progress}%</div>
                <BorderLinearProgress variant="determinate" value={progress} />
              </div>
            </Box>
          </div>
        </div>
        <div className="foundation">
          {console.log("asdfas", infos.donationLogo)}
          <div
            className="foundation_image"
            style={{ backgroundImage: `url(${infos.donationLogo})` }}
          ></div>
          <div className="foundation_profile">
            <div className="team">주최기관</div>
            <Link to={`/vote/detail/${foundation.foundationIdx}`}>
              <div className="foundation_name">{foundation.foundationName}</div>
            </Link>
          </div>
        </div>
        <div className="period">
          모금기간: {infos.donationStartDate.substr(0, 10)} ~
          {infos.donationEndDate.substr(0, 10)}
        </div>
        <div className="found_data" onClick={handleTap}>
          <i className="bx bxs-down-arrow"></i>
          {foundation.foundationName}는?
          {openTap ? (
            <>
              <div>{foundation.foundationContent}</div>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="comment_section">
          <div className="section_title">마음을 나누는 댓글</div>
          <hr />
          <br />
          <form onSubmit={handlePreventDefault}>
            <div className="my_comment">
              <div className="my_badge"></div>
              <textarea
                onChange={checkValueLength}
                className="my_comment_box"
                maxLength="500"
                placeholder="댓글만 써도 마음이 전해집니다."
              />
            </div>
            <div className="comment_info">
              <div className="comment_count">{valueLength}/500</div>
              <button
                onSubmit={commentPost}
                className="registBtn"
                type="submit"
              >
                등록
              </button>
            </div>
          </form>
          <hr />
          <br />
          <div className="comment_list_section">
            <div className="comment_list_section_header">
              댓글 <span>{comment_list_count}</span>
            </div>
            <br />
            <div className="comment_liiiiist">
              {comm.map((com) => (
                <div className="comment_boox">
                  <div className="boox_img"></div>
                  <div className="cla">
                    <div className="boox_name">{userName}</div>
                    <div className="mapComment">
                      {com.donationCommentContent}
                    </div>
                    <div className="btnbtn">
                      {com.userIdx === localStorage.getItem("idx") ? (
                        <button
                          value={com.donationCommentIdx}
                          onClick={deleteMyComment}
                          className="deleteBtn_1"
                        >
                          삭제
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr />
          <br />
        </div>
        <div className="donation_menu">
          <div className="leftMenu">
            <div onClick={upCheerCount} className="cheer">
              <div className="cheering">
                <i className="bx bxs-heart"></i>
                <div className="cheer_text">응원</div>
              </div>
              <div className="cheer_count">{cheerCount}</div>
            </div>
            <div className="line"></div>
            <div onClick={clip} className="share">
              <i className="bx bxs-share-alt"></i>
              공유
            </div>
          </div>
          <div onClick={handleOpen} className="rightMenu">
            <div className="rightMenu_text">기부하기</div>
          </div>
        </div>
        <div className="modal">
          <Modal
            keepMounted
            open={open}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
          >
            <Box sx={style}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modalTitle">기부금 결제</div>
                <div className="modalWallet">
                  내 지갑 잔액:
                  <span>{wallet_eth.toLocaleString("ko-KR")}eth</span>
                </div>
                <input
                  className="modalInput"
                  placeholder="기부할 금액"
                  type="number"
                  step="any"
                  {...register("donation", { required: true })}
                  isDisabled={formState.isSubmitting}
                  onChange={testinput}
                  min="0"
                  value={inputValue}
                />
                <div onClick={resetBtn} className="reinput">
                  다시 입력
                </div>
                <div className="modalCost">
                  <div className="donationCost">
                    <span>{inputValue}</span> eth
                  </div>
                  {inputValue ? <div className="dollar"></div> : ""}
                </div>
                <div className="modal_p">당신의 마음을 표현해주세요</div>
                <button type="submit" className="donBtn">
                  기부하기
                </button>
              </form>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default DonationDetailPage;
