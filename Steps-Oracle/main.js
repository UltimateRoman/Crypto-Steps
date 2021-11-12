const HDWalletProvider = require("@truffle/hdwallet-provider");
const {Board, IMU, Button} = require("johnny-five");
const board = new Board();

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: process.env.MNEMONIC || "",
  },
  providerOrUrl:
    "https://localhost:8000" ||
    "", //
});
const web3 = new Web3(provider);

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
    const tokenCount = web3.utils.toWei(count/20);
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

