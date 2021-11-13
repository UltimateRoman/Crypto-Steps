const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const CryptoStepsToken = require("./abis/CryptoStepsToken.json");
const {Board, IMU, Button} = require("johnny-five");
const board = new Board();

require('dotenv').config();
let provider;
async function load() {
    provider = new HDWalletProvider({
    mnemonic: {
      phrase: process.env.MNEMONIC || "",
    },
    providerOrUrl:
      "http://localhost:8545" ||
      "", //
  });
  
}
load();


const web3 = new Web3(provider);
const cryptoStepsToken = new web3.eth.Contract(CryptoStepsToken.abi, process.env.CRADDRESS);
const userAddress = "0x9eD036CDaE4A35Fa82eBc45519c8009DF33f03cD";

board.on("ready", () => {
  const imu = new IMU({
    controller: "MPU6050"
  });

  const button = new Button(6);
  let previousMillis = 0, currentMillis, count = 0, flag = 0;
  const interval = 100000000000000;
  board.repl.inject({
    button: button
  });

  button.on("down", async function() {
    try {
      let accounts = await web3.eth.getAccounts();
      const tokenAmount = web3.utils.toWei((count/20).toString());
      await cryptoStepsToken.methods.increaseUserRewards(
          tokenAmount,
          userAddress
        )
        .send({from: accounts[0]})
        .on("transactionHash", function (hash) {})
        .on("receipt", function (receipt) {})
        .on("confirmation", (confirmationNumber, receipt) => {
          console.log("Added reward");
        })
        .on("error", (error, receipt) => {
          console.log("Error occured: ", error);
        });
    } catch (error) {
      console.error(error);
    }
    count = 0;
  });
  
  imu.on("change", () => {

    const accelY = imu.accelerometer.y
    const gForceY = accelY;
    if(gForceY > 0.5) {
      flag = 1;
      previousMillis = new Date();
      currentMillis = new Date();
    }
    if ((currentMillis - previousMillis <= interval) && (flag)) {
      if(gForceY < -0.5) {
        count++;
        flag = 0;
      }
    }
    currentMillis = new Date();
    if(currentMillis - previousMillis > interval) {
      flag = 0;
    }
    
  });

});

