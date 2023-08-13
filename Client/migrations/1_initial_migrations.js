const Voting = artifacts.require("Voting");
const Roles = artifacts.require("Roles");

module.exports = function (deployer) {
    deployer.deploy(Voting)
    deployer.deploy(Roles)
}