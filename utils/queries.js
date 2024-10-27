import { getContract } from "./index"

const parseErrorMsg = (e) => {
    const json = JSON.parse(JSON.stringify(e))
    return json?.reason || json?.error?.msg
}

let contractObject = null

const initContract = () => {
    if (!contractObject) {
        contractObject = getContract()
    }
    return contractObject
}

//create user
export const createUser = async (
    username,
    basicInfo,
    professionalInfo,
    socialLinks,
    visibility,
) => {
    try {
        const contract = initContract()
        if (!contract) throw new Error("Contract is not initialized")

        const txResponse = await contract.createUser(
            username,
            basicInfo,
            professionalInfo,
            socialLinks,
            visibility,
        )

        const txReceipt = await txResponse.wait()

        return {
            success: true,
            txReceipt: txReceipt,
        }
    } catch (error) {
        console.log("error at createUser ", error)
        return {
            success: false,
            errorMessage: parseErrorMsg(error),
        }
    }
}

//edit user
export const editUser = async (username, basicInfo, professionalInfo, socialLinks, visibility) => {
    try {
        const contract = initContract()
        if (!contract) throw new Error("Contract is not initialized")

        const txResponse = await contract.editUser(
            username,
            basicInfo,
            professionalInfo,
            socialLinks,
            visibility,
        )

        const txReceipt = await txResponse.wait()

        return {
            success: true,
            txReceipt: txReceipt,
        }
    } catch (error) {
        console.log("error at createUser ", error)
        return {
            success: false,
            errorMessage: parseErrorMsg(error),
        }
    }
}

//get user by username
export const getUserByUsername = async (username) => {
    try {
        const contract = initContract()
        if (!contract) throw new Error("Contract is not initialized")

        const user = await contract.getUserByUsername(username)

        return {
            success: true,
            basicInfo: {
                firstName: user.basicInfo.firstName,
                lastName: user.basicInfo.lastName,
                email: user.basicInfo.email,
                homeAddress: user.basicInfo.homeAddress,
                phoneNumber: user.basicInfo.phoneNumber,
                dateOfBirth: user.basicInfo.dateOfBirth,
            },
            socialLinks: {
                xProfile: user.socialLinks.xProfile,
                instagramProfile: user.socialLinks.instagramProfile,
                linkedinProfile: user.socialLinks.linkedinProfile,
            },
            professionalInfo: {
                education: user.professionalInfo.education,
                workHistory: user.professionalInfo.workHistory,
                jobTitle: user.professionalInfo.jobTitle,
                userDescription: user.professionalInfo.userDescription,
                skills: user.professionalInfo.skills,
                imageUrl: user.professionalInfo.imageUrl,
            },
            visibility: {
                education: user.visibility.education,
                workHistory: user.visibility.workHistory,
                phoneNumber: user.visibility.phoneNumber,
                homeAddress: user.visibility.homeAddress,
                dateOfBirth: user.visibility.dateOfBirth,
            },
        }
    } catch (error) {
        console.log("error at getUserByUsername ", error)
        return {
            success: false,
            errorMessage: parseErrorMsg(error),
        }
    }
}

// get user by address
export const getUserByAddress = async (userAddress) => {
    try {
        const contract = initContract()
        if (!contract) throw new Error("Contract is not initialized")

        const user = await contract.getUserByAddress(userAddress)
        return {
            success: true,
            basicInfo: {
                firstName: user.basicInfo.firstName,
                lastName: user.basicInfo.lastName,
                email: user.basicInfo.email,
                homeAddress: user.basicInfo.homeAddress,
                phoneNumber: user.basicInfo.phoneNumber,
                dateOfBirth: user.basicInfo.dateOfBirth,
            },
            socialLinks: {
                xProfile: user.socialLinks.xProfile,
                instagramProfile: user.socialLinks.instagramProfile,
                linkedinProfile: user.socialLinks.linkedinProfile,
            },
            professionalInfo: {
                education: user.professionalInfo.education,
                workHistory: user.professionalInfo.workHistory,
                jobTitle: user.professionalInfo.jobTitle,
                userDescription: user.professionalInfo.userDescription,
                skills: user.professionalInfo.skills,
                imageUrl: user.professionalInfo.imageUrl,
            },
            visibility: {
                education: user.visibility.education,
                workHistory: user.visibility.workHistory,
                phoneNumber: user.visibility.phoneNumber,
                homeAddress: user.visibility.homeAddress,
                dateOfBirth: user.visibility.dateOfBirth,
            },
        }
    } catch (error) {
        console.log("Error at getUserByAddress", error)
        return {
            success: false,
            errorMessage: parseErrorMsg(error),
        }
    }
}

//get username by address
export const getUsernameByAddress = async (userAddress) => {
    try {
        const contract = initContract()
        if (!contract) throw new Error("Contract is not initialized")

        const username = await contract.getUsernameByAddress(userAddress)
        console.log("Username is", username)
        return {
            success: true,
            username: username,
        }
    } catch (error) {
        console.log("Error at getUsernameByAddress", error)
        return {
            success: false,
            errorMessage: parseErrorMsg(error),
        }
    }
}

//set visibility
export const setVisibility = async (visibility) => {
    try {
        const contract = initContract()
        if (!contract) throw new Error("Contract is not initialized")

        const txResponse = await contract.setVisibility(visibility)
        const txReceipt = await txResponse.wait()

        return {
            success: true,
            txReceipt: txReceipt,
        }
    } catch (error) {
        console.log("Error at setVisibility", error)
        return {
            success: false,
            errorMessage: parseErrorMsg(error),
        }
    }
}

//getVisibility

export const getVisibility = async (userName) => {
    try {
        const contract = initContract()
        if (!contract) throw new Error("Contract is not initialized")

        const visibility = await contract.getVisibility(userName)

        return {
            success: true,
            visibility: visibility,
        }
    } catch (error) {
        console.log("Error at getVisibility", error)
        return {
            success: false,
            errorMessage: parseErrorMsg(error),
        }
    }
}
