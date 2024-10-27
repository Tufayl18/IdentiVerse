/** @type import('hardhat/config').HardhatUserConfig */

// require("@nomicfoundation/hardhat-toolbox")
require("dotenv").config()

// require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
// require("solidity-coverage")
require("hardhat-deploy")
require("@nomiclabs/hardhat-ethers")

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const SEPOLIA_PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY
const BTT_RPC_URL = process.env.BTT_RPC_URL
const BTT_PRIVATE_KEY = process.env.BTT_PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [SEPOLIA_PRIVATE_KEY],
            chainId: 11155111,
            blockConfirmations: 6,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            chainId: 31337,
        },
        BitTorrent: {
            url: BTT_RPC_URL,
            accounts: [BTT_PRIVATE_KEY],
            gasPrice: 2000000000,
            chainId: 1029,
        },
        hardhat: {
            allowUnlimitedContractSize: true,
            throwOnTransactionFailures: true,
            throwOnCallFailures: true,
            loggingEnabled: true,
        },
    },

    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },

    namedAccounts: {
        deployer: {
            default: 0,
        },
    },

    solidity: "0.8.24",
}
