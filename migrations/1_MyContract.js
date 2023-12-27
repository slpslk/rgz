var Mycontract = artifacts.require("./MyContract.sol");

module.exports = function (deployer) {
    deployer.deploy(Mycontract);
};