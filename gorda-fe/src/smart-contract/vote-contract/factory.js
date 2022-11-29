import web3 from "./web3";
import VoteFactory from "./build/VoteFactory.json";

// deploy.js 후 생성된 Contract 주소 추가하기
const instance = new web3.eth.Contract(
  VoteFactory.abi,
  "0xb9FF7c2AA06552004aAa795f647217FA326E7096"
);

console.log("instance", instance);

export default instance;
//첫 배포 시 배포된 컨트랙트를 어떻게든 하는애. 전체 배포 시 필요
