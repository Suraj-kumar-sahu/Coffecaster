import abi from "./contract/Coffee.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x37b0589766587548574ca5cAb0278517200584F5";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });

          // below 2 are provided by metamask
          window.ethereum.on("chainChanged",()=>{
            window.location.reload() ;
          });

          window.ethereum.on("accountChanged",()=>{
            window.location.reload() ;
          })

        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, [state.contract]);
  // console.log(state);
  return (
    <div className="App">
      <div className="nav">
        <img src="https://cdn-icons-png.flaticon.com/512/1047/1047503.png" alt="coffee" />
        <p>Connected Account : {account}</p>
        <button><a href="https://surajkumarsahu.netlify.app/">Maker</a></button>
      </div>
      <div className="container">
        <span>
          <img src="https://cdn-icons-png.flaticon.com/512/5675/5675029.png" alt="" />
          <h1>A supporter is worth a thousand followers.</h1>
          {/* <img src="https://cdn-icons-png.flaticon.com/512/4123/4123821.png" alt="" /> */}
        </span>
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
}

export default App;
