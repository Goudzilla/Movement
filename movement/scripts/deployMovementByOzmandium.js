const hre = require("hardhat");

async function main() {
  const MovementByOzmandium = await hre.ethers.getContractFactory(
    "MovementByOzmandium"
  );
  const movementByOzmandium = await MovementByOzmandium.deploy();

  await movementByOzmandium.deployed();

  console.log("MovementByOzmandium deployed to:", movementByOzmandium.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
