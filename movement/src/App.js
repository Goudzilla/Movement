import logo from "./buttons/logo.png";
import pic1 from "./buttons/26.png";
import pic2 from "./buttons/27.png";
import pic3 from "./buttons/28.png";
import opensea from "./buttons/opensea.svg";
import twitter from "./buttons/twitter.svg";
import NavBar from "./NavBar";
import MainMint from "./MainMint";
import { useState } from "react";

import "./App.css";

function App() {
  const [accounts, setAccounts] = useState([]);

  return (
    <div className="landing-section">
      <div className="toolbar">
        <div className="icons">
          <div>
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="buttons">
            <NavBar accounts={accounts} setAccounts={setAccounts} />
            <MainMint
              className="buttons"
              accounts={accounts}
              setAccounts={setAccounts}
            />
          </div>
          <div>
            <div className="buttons">
              <div>
                <a href="https://twitter.com/AIIllustration">
                  <img src={twitter} alt="logo" class="bi bi-twitter" />
                </a>
              </div>
              <div>
                <img src={opensea} alt="logo" class="logo2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fex">
        <div className="App-header">
          <p className="App-title">Movement by Ozmandium</p>
          <p>
            All AI-assisted, using my irl work to explore directions and curated
            into one collection- Movement
          </p>
        </div>
        <div className="tree-block">
          <img className="tree" src={pic1} alt="logo" />
          <img className="tree" src={pic2} alt="logo" />
          <img className="tree" src={pic3} alt="logo" />
        </div>
      </div>
    </div>
  );
}

export default App;
