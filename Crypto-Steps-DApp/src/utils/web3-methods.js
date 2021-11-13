import Web3 from "web3";
import CryptoStepsToken from "./abis/CryptoStepsToken.json";
import CryptoStepsNFT from "./abis/CryptoStepsNFT.json";

let web3, account, csToken, csNFT;

export const loadWeb3 = async () => {
    try {
        if (typeof window.ethereum !== 'undefined') {
            web3 = new Web3(window.ethereum);
            try {
            await window.ethereum.enable();
            return true;
            } catch (err) {
            console.log('Transaction rejected by user:', err);
            return false;
            };
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
            return true;
        } else {
            window.alert('Wallet not connected. Please install the Metamask plugin');
            return false;
        };
    } catch (err) {
    console.log('Error: ', err);
    return false;
    };
};

export const connectAccount = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
        window.location.reload();
    });
    if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        account = accounts[0];
    } else {
        window.alert("Please install the Metamask plugin");
    }
    return account;
};

export const loadBlockchainData = async () => {
    const networkId = await web3.eth.net.getId();
    
    const csTokenData = CryptoStepsToken.networks[networkId];
    const csNFTData = CryptoStepsNFT.networks[networkId];
    if(csTokenData && csNFTData) {
      csToken = new web3.eth.Contract(CryptoStepsToken.abi, csTokenData.address);
      csNFT = new web3.eth.Contract(CryptoStepsNFT.abi, csNFTData.address);
      return true;
    } else {
      window.alert("Unidentified network, please connect to Mumbai Testnet");
      return false;
    }
};

export const getNetwork = async () => {
    const networkId = await web3.eth.net.getId();  
    if(networkId === 137) {
      return "Polygon";
    } else if(networkId === 80001) {
      return "Mumbai Testnet";
    } 
  
    return "Unidentified Network";
};

export const getCSTBalance = async () => {
    const result = await csToken.methods.balanceOf(account).call();
    const balance = web3.utils.fromWei(result);
    return balance;
};

export const unclaimedCST = async () => {
    const cst = await csToken.methods.unclaimedRewards(account).call();
    const balance = web3.utils.fromWei(cst);
    return balance;
}

export const claimRewards = async (metadata) => {
    await csToken.methods.withdrawReward(metadata)
    .send({from: account})
    .on("transactionHash", function (hash) {})
    .on("receipt", function (receipt) {})
    .on("confirmation", (confirmationNumber, receipt) => {
      window.location.reload();
    })
    .on("error", (error, receipt) => {
      window.alert("Error occured: ", error);
    });
};

export const getNFTs = async() => {
    const nftCount = await csNFT.methods.returnNFTCount().call();
    let nfts = [];
    for(var i = 0; i < nftCount; ++i) {
      const nft = await csNFT.methods.badges(i).call();
      if(nft.owner.toUpperCase() === account.toUpperCase()) {
        nfts.push(nft);
      }
    }
    return nfts;
};

export const getTokenURI = async(tokenId) => {
    const uri = await csNFT.methods.tokenURI(tokenId).call();
    return uri;
};

