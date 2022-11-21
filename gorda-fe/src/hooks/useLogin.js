import { useEffect, useState } from "react";
import Web3 from "web3";
import { signIn } from "../api/Users";

export default function useLogin() {
  const [isConnected, setIsConnected] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [role, setrole] = useState();
  const [idx, setIdx] = useState();

  useEffect(() => {
    function checkConnectedWallet() {
      const userData = JSON.parse(localStorage.getItem("userAccount"));
      if (userData != null) {
        setUserInfo(userData);
        setIsConnected(true);
      }
    }
    checkConnectedWallet();
  }, []);

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

  const onConnect = async () => {
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
        const chainId = await web3.eth.getChainId();
        const account = userAccount[0];

        let ethBalance = await web3.eth.getBalance(account); // Get wallet balance
        ethBalance = web3.utils.fromWei(ethBalance, "ether"); //Convert balance to wei
        saveUserInfo(ethBalance, account, chainId);

        if (userAccount.length === 0) {
          console.log("Please connect to meta mask");
        } else {
          await signIn(
            { userAccount: userAccount[0] },
            (response) => {
              localStorage.setItem("Role", response.data.userRole);
              localStorage.setItem("idx", response.data.userIdx);
              setrole(response.data.userRole);
              setIdx(response.data.userIdx);
            },
            (err) => {
              console.log("에러", err);
            }
          );
        }
      }
    } catch (err) {
      console.log(
        "There was an error fetching your accounts. Make sure your Ethereum client is configured correctly."
      );
    }
  };

  const onDisconnect = () => {
    localStorage.clear();
    setUserInfo({});
    setIsConnected(false);
    window.location.replace("/");
  };

  const getSignature = async () => {
    try {
    } catch (err) {
      console.log(
        "There was an error fetching your accounts. Make sure your Ethereum client is configured correctly."
      );
    }
  };

  const saveUserInfo = (ethBalance, account, chainId) => {
    const userAccount = {
      account: account,
      balance: ethBalance,
      connectionid: chainId,
    };
    window.localStorage.setItem("userAccount", JSON.stringify(userAccount));
    window.localStorage.setItem("Role", JSON.stringify(role)); //user persisted data
    window.localStorage.setItem("idx", JSON.stringify(idx));

    const userData = JSON.parse(localStorage.getItem("userAccount"));
    setUserInfo(userData);
    setIsConnected(true);
    return userAccount;
  };
  return {
    isConnected,
    userInfo,
    onConnect,
    onDisconnect,
    saveUserInfo,
    getSignature,
    detectCurrentProvider,
  };
}
