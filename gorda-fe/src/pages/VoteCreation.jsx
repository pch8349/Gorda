import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import factory from "../smart-contract/vote-contract/factory";
import web3 from "../smart-contract/vote-contract/web3";
import NavigationBar from "../components/NavigationBar";
import "./AdminForm.scss";
import "./voteCreation.scss";
import apiInstance from "../api/Index";
function VoteCreation() {
  const [voteData, setVotedata] = useState();
  const [voteday1, setvoteday1] = useState();
  const [voteday2, setvoteday2] = useState();
  const voteAccount = [];
  const voteName = [];
  const voteIdx = [];
  const api = apiInstance();
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("api/foundation/")
      .then((res) => {
        setVotedata(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    mode: "onChange",
  });

  const handleOnClick = async (e) => {
    const time = (new Date(voteday2) - new Date(voteday1)) / 1000;
    e.preventDefault();
    for (let i = 0; i < voteData.length; i++) {
      voteAccount.push(voteData[i].foundationAccount);
      voteIdx.push(i);
      voteName.push(voteData[i].foundationName);
    }

    try {
      const accounts = await web3.eth.getAccounts();
      const result = await factory.methods
        .createVote(voteAccount, voteName, voteIdx, time)
        .send({
          from: accounts[0],
        });
    } catch (err) {
      setError(err.message);
      console.log(err);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="creation_form">
        <div className="creation_header">이달의 기관 투표 설정</div>
        <form>
          <input
            className="creationInput"
            placeholder="시작 일자 xxxx-xx-xx"
            type="string"
            onChange={(e) => setvoteday1(e.target.value)}
          />
          <input
            className="creationInput"
            placeholder="마감 일자 xxxx-xx-xx"
            type="string"
            onChange={(e) => setvoteday2(e.target.value)}
          />
          <input
            className="creationBtn"
            type="submit"
            onClick={handleOnClick}
          />
        </form>
      </div>
    </>
  );
}

export default VoteCreation;
