// we created this file to test the smartcontract . Obviously you can do this by test also

const hre = require("hardhat");

async function getBalances(address){
  const balanceBigInt = await hre.ethers.provider.getBalance(address) ;
  return hre.ethers.utils.formatEther(balanceBigInt) ;
}

async function consoleBalances(addresses){
  let counter =0 ;
  for(const address of addresses){
    console.log(`Address ${counter} balance: `,await getBalances(address));
    counter++ ;
  }
}

async function consoleMemos(memos){
  for(const memo of memos){
    const timestamp = memo.timestamp ;
    const name = memo.name ;
    const from = memo.from ;
    const message = memo.message ;
    console.log(`At ${timestamp},name ${name} ,from ${from},message ${message}`);
  }
}

async function main() {
  const[owner,from1,from2] = await hre.ethers.getSigners() ;
  const Coffee = await hre.ethers.getContractFactory("Coffee") ;
  const contract = await Coffee.deploy() ;
  await contract.deployed() ;
  console.log("Address of contract:",contract.address) ;

  const addresses = [owner.address , from1.address , from2.address] ;
  console.log("before buying coffee");
  await consoleBalances(addresses) ;

  const amount = {value: hre.ethers.utils.parseEther("1")} ;
  await contract.connect(from1).buyCoffee("from1","nice job",amount) ;
  await contract.connect(from2).buyCoffee("from2","very nice job",amount)

  console.log("before buying coffee");
  await consoleBalances(addresses) ;

  const memos = await contract.getMemos() ;
  consoleMemos(memos) ;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
