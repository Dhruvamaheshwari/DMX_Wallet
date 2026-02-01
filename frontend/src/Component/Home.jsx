/** @format */
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="flex-1 bg-black text-white p-4 sm:p-6 md:p-10 flex flex-col">
        <div className="flex-1 mb-10 sm:mb-90">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold mb-2">
            Your Keys. Your Solana.
          </h1>
          <p className="text-gray-400 mb-6 text-sm sm:text-base">
            Choose a blockchain to get started.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/solana"
              className="border border-gray-700 px-4 sm:px-6 py-2 rounded-xl hover:bg-white hover:text-black transition-all text-sm sm:text-base">
              Solana
            </Link>
            {/* <Link
            to="/ethereum"
            className="border border-gray-700 px-6 py-2 hover:bg-white hover:text-black">
            Ethereum
          </Link> */}
          </div>
        </div>
      </div>

      <footer className="text-center p-4 sm:p-5 border-t-2 border-gray-800">
        <p className="text-gray-500 text-xs sm:text-sm">
          Created with <span className="text-red-500 animate-pulse">❤️</span> by{" "}
          <span className="text-white font-medium hover:text-purple-400 transition-colors cursor-pointer">
            Dhruva Maheshwari
          </span>
        </p>
      </footer>
    </>
  );
}

export default Home;
