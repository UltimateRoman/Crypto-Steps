import { 
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

function App() {
  const [account, setAccount] = useState("Not Connected");
  const [networkName, setNetwork] = useState("Unidentified Network");
  const [isConnected, setConnected] = useState(false);

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
          setConnected(true);
        }
      }
    }
  },[isConnected]);

  if(isConnected) {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
    } else {
      return (
        <h1>Not Connected</h1>
      )
    }
}

export default App;
