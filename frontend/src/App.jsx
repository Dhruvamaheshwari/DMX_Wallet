/** @format */

import { Route, Routes } from "react-router-dom";
import Home from "./Component/Home";
import Solana from "./Component/Solana";
import Ethereum from "./Component/Ethereum";
import Navbar from "./Component/Navbar";

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solana" element={<Solana />} />
        {/* <Route path='/ethereum' element={<Ethereum/>}/>  */}
      </Routes>
    </div>
  );
}

export default App;
