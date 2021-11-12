const {Board, IMU, Button} = require("johnny-five");
const board = new Board();

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

  button.on("down", function() {
    console.log(count);
    count = 0;
  });
  console.log(previousMillis);
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

