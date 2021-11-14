# Crypto Steps
Physical activity tracking and incentivising people with crypto token rewards to motivate them to achieve their fitness goals, making use of IOT and Blockchain.

<p align="center">
<img src="/Crypto-Steps-DApp/public/logo.png"/>
</p>

## Overview

Crypto Steps is mainly composed of a wearable pedometer/activity tracker and a decentralized client application. The user's physical activity and steps travelled is tracked by the device and correspondingly the user is eligible for rewards in the form of Crypto Steps Tokens(CST) . This data is stored on the Blockchain using Smart Contracts. Thereby, by engaging in walking or any other activity, users become eligible for a higher amount of CST rewards. To claim their accrued rewards, users can visit the decentralized application(DApp). Here they can connect their wallet and claim their accrued CST tokens directly into their wallet. The DApp also provides additional rewards in the form of NFTs which can be earned by users for keeping up their streak or for achieving various fitness milestones. The system is also privacy preserving in nature as there is no kind of association with the personal identity of the user and all operations are carried out only using pseudonymous blockchain addresses.

<p align="center">
<img src="/flow.png"/>
</p>

The project is in fact a complex intersection of IOT and Blockchain technologies. We built the wearable pedomoter device using Arduino and an MPU6050 sensor. We built an Oracle in Node JS with the help of the Johnny-Five library and Firmata protocol along with truffle-hdwallet-provider to achieve reliable and secure communication between the Arduino device and the Smart contracts. The Smart contracts were coded in Solidity and are deployable on any EVM-compatible chain. For the prototype, we are utilising Polygon's Mumbai test network for enhanced user experience, by virtue of the fast transactions and low gas fees. The client DApp was built with React JS and web3js. We have also utilised the Metamask wallet to interact with the DApp. To sum it up-

- IOT pedometer/ motion tracker device - Arduino, MPU6050 sensor
- Oracle - Node JS, Johnny-Five library, Firmata protocol, Truffle HDWallet Provider
- Smart Contracts - Solidity, Truffle framework, Polygon Testnet
- Client DApp - React JS, web3js, MUI, Metamask wallet

### Arduino/IOT pedometer

<p align="center">
<img src="/circuit.JPG"/>
</p>
