/** @format */
// import img from '../assets/DMX.png';
function Navbar() {
  return (
    <nav className="bg-black border-b border-gray-800 px-4 sm:px-6 md:px-10 py-3 sm:py-4">
      <div className="flex items-center gap-2 sm:gap-3">
        {/* <img
          src={img}
          alt="DMX Wallet"
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg"
        /> */}
        <span className="text-white text-lg sm:text-xl font-semibold">
          DMX Wallet
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
