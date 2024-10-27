// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

error IdentiVerse__UsernameExists();
error IdentiVerse__NonExistingUser();

contract IdentiVerse {
    event UserCreated(string indexed username, address indexed userAddress);
    event UserEdited(string indexed username);
    event VisibilityChanged(string indexed username, Visibility visibility);

    struct User {
        BasicInfo basicInfo;
        SocialLinks socialLinks;
        ProfessionalInfo professionalInfo;
        Visibility visibility;
        bool exist;
        uint[] appliedJob;
    }

    struct BasicInfo {
        string firstName;
        string lastName;
        string email;
        string homeAddress;
        string phoneNumber;
        string dateOfBirth;
    }

    struct SocialLinks {
        string xProfile;
        string instagramProfile;
        string linkedinProfile;
    }

    struct ProfessionalInfo {
        string education;
        string workHistory;
        string jobTitle;
        string userDescription;
        string[] skills;
        string imageUrl;
    }

    struct Visibility {
        bool education;
        bool workHistory;
        bool phoneNumber;
        bool homeAddress;
        bool dateOfBirth;
    }

    mapping(string => User) private users;
    mapping(address => string) private addressToUsername;
    mapping(string => bool) private usernames;

    modifier onlyUniqueUsername(string memory username) {
        if (usernames[username]) {
            revert IdentiVerse__UsernameExists();
        }

        // require(!usernames[username], "Username already taken");
        _;
    }

    modifier userExists(string memory username) {
        if (!users[username].exist) {
            revert IdentiVerse__NonExistingUser();
        }
        // require(users[username].exist, "User does not exist");
        _;
    }

    function createUser(
        string memory username,
        BasicInfo memory basicInfo,
        ProfessionalInfo memory professionalInfo,
        SocialLinks memory socialLinks,
        Visibility memory visibility
    ) public onlyUniqueUsername(username) {
        User storage user = users[username];
        user.basicInfo = basicInfo;
        user.professionalInfo = professionalInfo;
        user.socialLinks = socialLinks;
        user.visibility = visibility;
        user.exist = true;
        usernames[username] = true;
        addressToUsername[msg.sender] = username;
        users[username] = user;

        emit UserCreated(username, msg.sender);
    }

    function editUser(
        string memory username,
        BasicInfo memory basicInfo,
        ProfessionalInfo memory professionalInfo,
        SocialLinks memory socialLinks,
        Visibility memory visibility
    ) public userExists(username) {
        User storage user = users[username];
        user.basicInfo = basicInfo;
        user.professionalInfo = professionalInfo;
        user.socialLinks = socialLinks;
        user.visibility = visibility;

        emit UserEdited(username);
    }

    function getUserByUsername(
        string memory username
    )
        public
        view
        userExists(username)
        returns (
            BasicInfo memory basicInfo,
            ProfessionalInfo memory professionalInfo,
            SocialLinks memory socialLinks,
            Visibility memory visibility
        )
    {
        User storage user = users[username];

        basicInfo = user.basicInfo;
        professionalInfo = user.professionalInfo;
        socialLinks = user.socialLinks;
        visibility = user.visibility;

        return (basicInfo, professionalInfo, socialLinks, visibility);
    }

    function getUserByAddress(
        address userAddress
    )
        public
        view
        returns (
            BasicInfo memory basicInfo,
            ProfessionalInfo memory professionalInfo,
            SocialLinks memory socialLinks,
            Visibility memory visibility
        )
    {
        string memory username = addressToUsername[userAddress];
        return getUserByUsername(username);
    }

    function getUsernameByAddress(address userAddress) public view returns (string memory) {
        return addressToUsername[userAddress];
    }

    function setVisibiliy(
        string memory username,
        Visibility memory visibility
    )
        public
        // bool education,
        // bool workHistory,
        // bool phoneNumber,
        // bool homeAddress,
        // bool dateOfBirth
        userExists(username)
    {
        User storage user = users[username];
        user.visibility = visibility;

        emit VisibilityChanged(username, visibility);
    }

    function getVisibility(
        string memory username
    ) public view userExists(username) returns (Visibility memory visibility) {
        return users[username].visibility;
    }

    // function addJob(string memory username)
}
