const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules")

module.exports = buildModule("Identifi", (m) => {
    const identifi = m.contract("Identifi")
    return { identifi }
})
