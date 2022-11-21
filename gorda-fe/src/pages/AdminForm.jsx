import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import factory from "../smart-contract/donate-contract/factory";
import web3 from "../smart-contract/donate-contract/web3";
import NavigationBar from "../components/NavigationBar";
import FactoryList from "../components/FoundationAdmin/FactoryList";
import CircularProgress from "@mui/material/CircularProgress";
import "./AdminForm.scss";
import apiInstance from "../api/Index";

function AdminForm() {
  const api = apiInstance();
  const [error, setError] = useState("");
  const [targetInUSD, setTargetInUSD] = useState();
  const [minContriInUSD, setMinContriInUSD] = useState();
  const [foundation, setFoundation] = useState([]);
  const [company, setCompany] = useState([]);
  const [inputValue, setInputValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
  });

  async function onSubmit(data) {
    data.foundation = data.foundation.split(",");
    const tmpCompanyArr = [];
    const tmpAmountArr = [];
    for (let i = 0; i < inputValue.length; i++) {
      if (inputValue[i][0] === "0") {
        tmpCompanyArr.push(data.foundation[0]);
        tmpAmountArr.push(inputValue[i][1]);
      } else {
        tmpCompanyArr.push(inputValue[i][0]);
        tmpAmountArr.push(inputValue[i][1]);
      }
    }
    console.log("테스트", tmpCompanyArr, tmpAmountArr);

    try {
      const accounts = await web3.eth.getAccounts();
      const timeStamp = parseInt(new Date(data.date).getTime() / 1000);
      navigate("#ScrollTop");
      setLoading(true);
      const result = await factory.methods
        .createCampaign(
          tmpCompanyArr,
          tmpAmountArr,
          web3.utils.toWei(data.minimumContribution, "ether"),
          accounts[0],
          data.campaignName,
          data.category,
          timeStamp,
          data.description,
          data.imageUrl,
          web3.utils.toWei(data.target, "ether")
        )
        .send({
          from: accounts[0],
        });
      const newCampaign = await factory.methods.getDeployedCampaigns().call();
      const now = new Date();

      api
        .post("api/donation/regist", {
          donationAccount: newCampaign[newCampaign.length - 1],
          donationContent: data.description,
          donationCurrentEth: 0,
          donationEndDate: new Date(data.date),
          donationLike: 0,
          donationLogo: data.imageUrl,
          donationName: data.campaignName,
          donationStartDate: now,
          donationSubject: data.category,
          donationTargetEth: web3.utils.toWei(data.target, "ether"),
          foundationIdx: data.foundation[1],
        })
        .then((res) => {
          setLoading(false);
          alert("기부가 생성되었습니다.");
          navigate("/dnlist");
        })
        .catch((e) => {
          console.log(e);
        });
      setLoading(false);
      navigate("/dnlist");
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  }

  useEffect(() => {
    api
      .get("api/company")
      .then((res) => {
        setCompany(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .get("api/foundation")
      .then((res) => {
        setFoundation(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changeInput = (value) => {
    let done = 0;

    for (let i = 0; i < inputValue.length; i++) {
      let cnt = 0;
      for (let j = 0; j < inputValue[i].length; j++) {
        if (inputValue[i][j] === value[j]) {
          cnt = cnt + 1;
        }
        if (cnt === 2) {
          let tmpArr = inputValue;
          let tmpValue = tmpArr.splice(i, 1);
          setInputValue(tmpArr);
          done = done + 1;
          break;
        }
      }
      if (done === 1) {
        break;
      }
    }

    if (done === 0) {
      setInputValue((inputValue) => [...inputValue, value]);
    }
  };

  return (
    <div>
      <NavigationBar id="ScrollTop" />

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
      <div className="form_container">
        <div className="form_title">기관 모금 게시글 작성</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select
            id="categories"
            {...register("foundation", { required: true })}
            isDisabled={isSubmitting}
          >
            <option value="">기관 선택</option>

            {foundation.map((item, key) => {
              return (
                <option
                  key={key}
                  value={[item.foundationAccount, item.foundationIdx]}
                >
                  {item.foundationName}
                </option>
              );
            })}
          </select>
          <input
            className="titleinput"
            placeholder="제목"
            {...register("campaignName", { required: true })}
            isDisabled={isSubmitting}
          />
          <div className="datecontainer">
            <input
              className="dateinput"
              placeholder="날짜"
              type="date"
              {...register("date", { required: true })}
              isDisabled={isSubmitting}
            />
          </div>

          <select
            id="categories"
            {...register("category", { required: true })}
            isDisabled={isSubmitting}
          >
            <option value="">카테고리 선택</option>
            <option value="hunger">기아</option>
            <option value="environment">환경</option>
            <option value="poor">빈곤</option>
            <option value="aged">노인</option>
          </select>
          <input
            className="titleinput"
            placeholder="미니멈컨트리뷰션"
            type="number"
            step="any"
            {...register("minimumContribution", { required: true })}
            isDisabled={isSubmitting}
            onChange={(e) => {
              setMinContriInUSD(Math.abs(e.target.value));
            }}
            min="0"
          />
          <input
            className="titleinput"
            placeholder="타겟 머니"
            type="number"
            step="any"
            {...register("target", { required: true })}
            isDisabled={isSubmitting}
            onChange={(e) => {
              setTargetInUSD(Math.abs(e.target.value));
            }}
            min="0"
          />
          <input
            className="titleinput"
            placeholder="이미지"
            {...register("imageUrl", { required: true })}
            isDisabled={isSubmitting}
            type="url"
          />
          <textarea
            className="textareainput"
            placeholder="디스크립션"
            {...register("description", { required: true })}
            isDisabled={isSubmitting}
          />
          <div className="btnContainer">
            <a href="#DonationManage" className="nextBtn">
              다음
            </a>
          </div>
          <section id="DonationManage">
            <div className="manage_container">
              <div className="manage_title">모금액 사용처</div>
              <div className="selection">운반/운송/식품 업체 선택</div>
              <hr className="hr" />
              <div className="manage_list">
                <FactoryList
                  idx="0"
                  name="기관 운영비"
                  changeInput={changeInput}
                />
                {company.map((item, key) => {
                  return (
                    <FactoryList
                      idx={item.companyAccount}
                      name={item.companyName}
                      changeInput={changeInput}
                    />
                  );
                })}
              </div>
            </div>
          </section>
          <div className="createBtn">
            <a href="#ScrollTop" className="nextBtn">
              <button type="submit" className="createBtn">
                작성하기
              </button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminForm;
