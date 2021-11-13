const CryptoStepsToken = artifacts.require("CryptoStepsToken");
const CryptoStepsNFT = artifacts.require("CryptoStepsNFT");

module.exports = async function(deployer) {
    await deployer.deploy(CryptoStepsToken);
    await deployer.deploy(CryptoStepsNFT);

    const csToken = await CryptoStepsToken.deployed();
    const csNFT = await CryptoStepsNFT.deployed();

    await csToken.setContractAddress(await csNFT.address);
    const MINTER_ROLE = web3.utils.soliditySha3("MINTER_ROLE");
    await csNFT.grantRole(MINTER_ROLE, await csToken.address);      
}