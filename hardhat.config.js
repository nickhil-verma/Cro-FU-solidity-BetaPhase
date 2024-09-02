require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

module.exports = {
    defaultNetwork: "rinkeby",
    networks: {
        rinkeby: {
            url: `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`,
            accounts: [`0x${process.env.PRIVATE_KEY}`]
        }
    },
    solidity: "0.8.0",
};
