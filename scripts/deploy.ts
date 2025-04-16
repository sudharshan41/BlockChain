
const hre = require("hardhat");

async function main() {
  const TerraLease = await hre.ethers.getContractFactory("TerraLease");
  const terraLease = await TerraLease.deploy();

  await terraLease.deployed();

  console.log("TerraLease deployed to Sepolia:", terraLease.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
