import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

// deploy.js 후 생성된 Contract 주소 추가하기
const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0x478c09404A213E4b9fE270a4b7D5d06f574733E7"
);

console.log("instance", instance);

export default instance;
//첫 배포 시 배포된 컨트랙트를 어떻게든 하는애. 전체 배포 시 필요
