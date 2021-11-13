import React, { 
  useEffect,
  useState
} from "react";
import './App.css';
import {
  loadWeb3,
  loadBlockchainData,
  connectAccount,
  getNetwork,
  getCSTBalance
} from "./utils/web3-methods";
import Header2 from "./header2";
import Main from "./Main";

function App() {
  const [account, setAccount] = useState("Not Connected");
  const [networkName, setNetwork] = useState("Unidentified Network");
  const [isConnected, setConnected] = useState(false);
  const [cstBalance, setCSTBalance] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const connected = await loadWeb3();
      if(connected) {
        const load = await loadBlockchainData();
        if(load) {
          const acc = await connectAccount();
          setAccount(acc);
          const networkName = await getNetwork();
          setNetwork(networkName);
          const cst = await getCSTBalance();
          setCSTBalance(cst);    
          setConnected(true);
        }
      }
    }
    fetchData();
  },[isConnected]);

  if(isConnected) {
    return (
      <div>
        <Header2
          isConnected={isConnected}
          networkName={networkName}
          account={account}
          cstBalance={cstBalance}
          connectAccount={connectAccount}
        />
        <Main/>
      </div>
    );
    } else {
      return (
        <div>
          <Header2
            isConnected={isConnected}
            networkName={networkName}
            account={account}
            cstBalance={cstBalance}
            connectAccount={connectAccount}
          />
        </div>
      )
    }
}

export default App;
