import { useState } from "react";
import { ethers, BigNumber } from "ethers";
import MovementByOzmandium from "./movement.json";

const movementByOzmandiumAddress = "0xcE2962Da0cB158C82BD81DfAcA7DFf65b232689a";

const MainMint = ({ accounts, setAccounts }) => {
  const [mintAmount, setMintAmount] = useState(1);
  const isConnected = Boolean(accounts[0]);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        movementByOzmandiumAddress,
        MovementByOzmandium.abi,
        signer
      );
      try {
        const response = await contract.mint(BigNumber.from(mintAmount), {
          value: ethers.utils.parseEther((0.012 * mintAmount).toString()),
        });
        console.log("response: ", response);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  }

  const handleDecrement = () => {
    if (mintAmount <= 1) return;
    setMintAmount(mintAmount - 1);
  };

  const handleIncrement = () => {
    if (mintAmount >= 2) return;
    setMintAmount(mintAmount + 1);
  };

  return (
    <div>
      {isConnected ? (
        <div classname="mint-button">
          <div className="mint-button">
            <button onClick={handleDecrement}>-</button>
            <input type="number" value={mintAmount} />
            <button onClick={handleIncrement}>+</button>
          </div>
          <div className="mint-button">
            <button onClick={handleMint}>Mint Now</button>
          </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default MainMint;
