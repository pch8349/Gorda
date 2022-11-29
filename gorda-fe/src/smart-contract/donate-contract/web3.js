const HDWalletProvider = require("@truffle/hdwallet-provider");

const Web3 = require("web3");
const compiledFactory = require("./build/VoteFactory.json");

require("dotenv").config();

// Metamask Mnemonic, Infura API Key
const provider = new HDWalletProvider(
  "test test test test test test test test test test test test",
  "https://goerli.infura.io/v3/test"
);

const web3 = new Web3(provider);
const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Attemping to deploy to accounts ", accounts[0]);
  console.log(compiledFactory.abi);
  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ from: accounts[0] });

  console.log("Contract deploy to ", result.options.address);
};

deploy();
