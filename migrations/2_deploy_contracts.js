var EthMadness = artifacts.require("./EthMadness.sol");
var SimpleToken = artifacts.require("./SimpleToken.sol");

// function getDeployerFor

const realTimestamps = [1553187600, 1554793199, 1554879599, 1555484399];
const mockTimestamps = [0,1,2,3];

module.exports = function(deployer) {
  if (deployer.network_id !== 1) {

    // If we're not on mainnet, deploy and ERC20 token with our contract to test the payouts
    let deployerAddress = SimpleToken.defaults().from;

    return deployer.deploy(SimpleToken).then(deployedToken => {
      const tokenAddress = deployedToken.address;
      console.log(`token address is ${tokenAddress}`);
      
      return deployer.deploy(EthMadness, mockTimestamps, tokenAddress, 500).then(deployedContest => {
        return deployedToken.contract.methods.transfer(deployedContest.address, 1000).send({
          from: deployerAddress
        });
      })
    });
  } else {
    const daiAddress = '0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359';
    return deployer.deploy(EthMadness, realTimestamps, daiAddress, 500);
  }
};


// 1553187600 - First game - 1553187600 - 10AM Thursday
// 1554793199 - Finals game - oracles can start - 1554793199 - Midnight April 8
// 1554879599 - Submissions can start - 1554879599 - Midnight April 9
// 1555484399 - Midnight April 16