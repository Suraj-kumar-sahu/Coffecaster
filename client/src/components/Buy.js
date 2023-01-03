import { ethers } from "ethers";
import "./Buy.css" ;

const Buy = ({ state }) => {
  const buyCoffee = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
    console.log(name, message, contract);
    const amount = { value: ethers.utils.parseEther("0.01") };
    const transaction = await contract.buyCoffee(name, message, amount);
    await transaction.wait();
    console.log("Transaction is done");
  };
  return (
    <>
        <form onSubmit={buyCoffee} className="form">
          <div className="inp-container">
            <label className="form-label">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter Your Name"
            />
          </div>
            
          <div className="inp-container">
            <label className="form-label">Message</label>
            <input
              type="text"
              id="message"
              placeholder="Enter Your Message"
            />
          </div>
          
          <button type="submit">
            Pay
          </button>
        </form>
    </>
  );
};
export default Buy;