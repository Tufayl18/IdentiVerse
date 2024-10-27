import { ethers } from "ethers"
import { contractAddress, abi } from "../constants"

export const getContract = () => {
    if (typeof window === "undefined") {
        console.error("window is undefined, this code must be run client-side.")
        return null
    }

    try {
        const { ethereum } = window

        if (!ethereum) {
            throw new Error(
                "Ethereum provider not found. Please install MetaMask or another Web3 wallet.",
            )
        }

        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const contractReader = new ethers.Contract(contractAddress, abi, signer)

        // Add event listeners
        contractReader.on("UserCreated", (username, userAddress) => {
            console.log(`New user created: ${username} at address ${userAddress}`)
        })

        contractReader.on("UserEdited", (username) => {
            console.log(`User ${username} was edited`)
        })

        contractReader.on("VisibilityChanged", (username, visibility) => {
            console.log(`Visibility for user ${username} was changed to`, visibility)
        })

        return contractReader
    } catch (error) {
        console.error("An error occurred while setting up the contract:", error.message)
        return null
    }
}
