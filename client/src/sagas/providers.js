import Web3 from 'web3';

export const getNodesmithWeb3 = async (networkId) => {
  const nsApiKey = '69bbfd65cae84e6bae3c62c2bde588c6';
  switch(networkId) {
    case '42':
      return new Web3(new Web3.providers.HttpProvider(`https://ethereum.api.nodesmith.io/v1/kovan/jsonrpc?apiKey=${nsApiKey}`));
    case '1':
      return new Web3(new Web3.providers.HttpProvider(`https://ethereum.api.nodesmith.io/v1/mainnet/jsonrpc?apiKey=${nsApiKey}`));
    default:
      throw new Error(`Unknown network id ${networkId}`);
  }
}

export const getInfuraWeb3 = async (networkId) => {
  const projectId = 'da0307e917e4414f9ec40a5e95548eb3'
  switch(networkId) {
    case '42':
      return new Web3(new Web3.providers.HttpProvider(`https://kovan.infura.io/v3/${projectId}`)); 
    case '1':
      return new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/${projectId}`));
    default:
      throw new Error(`Unknown network id ${networkId}`);
  }
}

export const getMetamaskWeb3 = async (networkId) => {
  if (window.ethereum) {
    return new Web3(window.ethereum);
  } else {
    return undefined;
  }
}
