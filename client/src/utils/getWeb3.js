import Web3 from "web3";

export const getWeb3WithAccounts = () =>
  new Promise(async (resolve, reject) => {
    // Modern dapp browsers...
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Acccounts now exposed
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      // Use Mist/MetaMask's provider.
      const web3 = window.web3;
      console.log("Injected web3 detected.");
      const version = web3.version;
      if (typeof version !== 'string' || !version.startsWith('1')) {
        console.error('Old version of web3 being injected, trying to wrap it in web3 1.0');
        console.error(version);
        resolve(new Web3(window.web3.provider));
      } else {
        resolve(web3);
      }
    }
    // Fallback to localhost; use dev console port by default...
    else {
      const provider = new Web3.providers.HttpProvider(
        "http://127.0.0.1:9545"
      );
      const web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
      resolve(web3);
    }
  });

