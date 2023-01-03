require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_URL = "https://eth-goerli.g.alchemy.com/v2/GQCJeImeTZCcod4-HNocXMKQWcU1fjsc";
const PRIVATE_KEY = "ce4111d66627d7f0e832585a5e689a69b35f3f4bae45ea5ccc708dedfc6c502f";
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};
