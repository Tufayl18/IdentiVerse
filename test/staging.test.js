const { expect } = require("chai")
const { deployments, ethers } = require("hardhat")

describe("IdentiVerse Contract", function () {
    let IdentiVerse, identiVerse, owner, user1, user2

    beforeEach(async function () {
        // ;[owner, addr1, addr2] = await ethers.getSigners()
        const accounts = await ethers.getSigners()
        owner = accounts[0]
        user1 = accounts[1]
        user2 = accounts[2]
        await deployments.fixture(["identiVerse"])
        IdentiVerse = await deployments.get("IdentiVerse")
        identiVerse = await ethers.getContractAt(IdentiVerse.abi, IdentiVerse.address)
    })

    describe("Deployment", function () {
        it("Should deploy the contract and set the owner", async function () {
            expect(await identiVerse.address).to.be.properAddress
            expect(await identiVerse.getUsernameByAddress(owner.address)).to.equal("")
        })
    })

    describe("User Management", function () {
        const basicInfo = {
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@example.com",
            homeAddress: "123 Main St",
            phoneNumber: "123-456-7890",
            dateOfBirth: "2000-01-01",
        }

        const socialLinks = {
            xProfile: "https://xprofile.com/johndoe",
            instagramProfile: "https://instagram.com/johndoe",
            linkedinProfile: "https://linkedin.com/in/johndoe",
        }

        const professionalInfo = {
            education: "BS Computer Science",
            workHistory: "Software Engineer at TechCorp",
            jobTitle: "Software Engineer",
            userDescription: "A passionate software engineer.",
            skills: ["Solidity", "JavaScript"],
            imageUrl: "https://example.com/image.jpg",
        }

        const visibility = {
            education: true,
            workHistory: true,
            phoneNumber: false,
            homeAddress: false,
            dateOfBirth: false,
        }

        it("Should create a user successfully", async function () {
            await identiFi.createUser(
                "johndoe",
                basicInfo,
                professionalInfo,
                socialLinks,
                visibility,
            )

            const user = await identiFi.getUserByUsername("johndoe")

            expect(user.basicInfo.firstName).to.equal(basicInfo.firstName)
            expect(user.basicInfo.lastName).to.equal(basicInfo.lastName)
            expect(user.basicInfo.email).to.equal(basicInfo.email)
            expect(user.basicInfo.homeAddress).to.equal(basicInfo.homeAddress)
            expect(user.basicInfo.phoneNumber).to.equal(basicInfo.phoneNumber)
            expect(user.basicInfo.dateOfBirth).to.equal(basicInfo.dateOfBirth)

            expect(user.professionalInfo.education).to.equal(professionalInfo.education)
            expect(user.professionalInfo.workHistory).to.equal(professionalInfo.workHistory)
            expect(user.professionalInfo.jobTitle).to.equal(professionalInfo.jobTitle)
            expect(user.professionalInfo.userDescription).to.equal(professionalInfo.userDescription)
            expect(user.professionalInfo.skills).to.deep.equal(professionalInfo.skills)
            expect(user.professionalInfo.imageUrl).to.equal(professionalInfo.imageUrl)

            expect(user.socialLinks.xProfile).to.equal(socialLinks.xProfile)
            expect(user.socialLinks.instagramProfile).to.equal(socialLinks.instagramProfile)
            expect(user.socialLinks.linkedinProfile).to.equal(socialLinks.linkedinProfile)

            expect(user.visibility.education).to.equal(visibility.education)
            expect(user.visibility.workHistory).to.equal(visibility.workHistory)
            expect(user.visibility.phoneNumber).to.equal(visibility.phoneNumber)
            expect(user.visibility.homeAddress).to.equal(visibility.homeAddress)
            expect(user.visibility.dateOfBirth).to.equal(visibility.dateOfBirth)
        })

        it("Should not allow duplicate usernames", async function () {
            await identiFi.createUser(
                "johndoe",
                basicInfo,
                professionalInfo,
                socialLinks,
                visibility,
            )
            await expect(
                identiFi.createUser(
                    "johndoe",
                    basicInfo,
                    professionalInfo,
                    socialLinks,
                    visibility,
                ),
            ).to.be.revertedWith("Username already taken")
        })

        it("Should edit a user successfully", async function () {
            await identiFi.createUser(
                "johndoe",
                basicInfo,
                professionalInfo,
                socialLinks,
                visibility,
            )

            const newVisibility = {
                education: false,
                workHistory: false,
                phoneNumber: true,
                homeAddress: true,
                dateOfBirth: true,
            }

            await identiFi.setVisibiliy("johndoe", newVisibility)

            const user = await identiFi.getUserByUsername("johndoe")

            expect(user.visibility.education).to.equal(newVisibility.education)
            expect(user.visibility.workHistory).to.equal(newVisibility.workHistory)
            expect(user.visibility.phoneNumber).to.equal(newVisibility.phoneNumber)
            expect(user.visibility.homeAddress).to.equal(newVisibility.homeAddress)
            expect(user.visibility.dateOfBirth).to.equal(newVisibility.dateOfBirth)
        })

        it("Should return correct user by address", async function () {
            await identiFi.createUser(
                "johndoe",
                basicInfo,
                professionalInfo,
                socialLinks,
                visibility,
            )
            await identiFi.setVisibiliy("johndoe", visibility)

            const userAddress = await identiFi.getUsernameByAddress(owner.address)
            expect(userAddress).to.equal("johndoe")

            const user = await identiFi.getUserByAddress(owner.address)
            expect(user.basicInfo.firstName).to.equal(basicInfo.firstName)
        })
    })
})
