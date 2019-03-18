var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
  if(deployer.network_id != 1){
    deployer.deploy(Migrations);
  }
};
