/** @format */

import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Solana() {
    const navigate = useNavigate();
    const [Form, setForm] = useState({});
    const [mnemonic, setmnemonic] = useState(() => {
        const savedMnemonic = localStorage.getItem("Mnemonic");
        return savedMnemonic ? JSON.parse(savedMnemonic) : [];
    });
    const [count, setCount] = useState(0);
    const [isWallet, setIsWallet] = useState(() => {
        const saveKey = localStorage.getItem("Keys");
        return saveKey ? JSON.parse(saveKey) : [];
    });
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [seeKey, setSeeKey] = useState({});
    const backendUrl= import.meta.env.VITE_BACKEND_URL;

    async function HandleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post(backendUrl, Form);
            if (res.status === 200) {
                setIsWallet((pre) => [
                    ...pre,
                    { publickey: res.data.public, privatekey: res.data.private },
                ]);
                setmnemonic(res.data.mnemonic.split(" "));
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    async function HandleClick(e) {
        e.preventDefault();
        setLoading(true);
        setCount((count) => count + 1);
        try {
            const res = await axios.post(backendUrl, { count: count });
            if (res.status === 200) {
                setIsWallet((pre) => [
                    ...pre,
                    { publickey: res.data.public, privatekey: res.data.private },
                ]);
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    function deleteWallet(index) {
        setIsWallet((prev) => prev.filter((v, i) => i !== index));
        if (isWallet.length <= 1) {
            setIsWallet([]);
            setmnemonic([]);
            setCount(0);
            localStorage.removeItem("Keys");
            localStorage.removeItem("Mnemonic");
            navigate("/");
        }
    }

    function clearAll() {
        setIsWallet([]);
        setmnemonic([]);
        setCount(0);
        localStorage.removeItem("Keys");
        localStorage.removeItem("Mnemonic");
        navigate("/");
    }

    function copyMnemonic() {
        navigator.clipboard.writeText(mnemonic.join(" "));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    useEffect(() => {
        localStorage.setItem("Keys", JSON.stringify(isWallet));
    }, [isWallet]);

    useEffect(() => {
        localStorage.setItem("Mnemonic", JSON.stringify(mnemonic));
    }, [mnemonic]);

    function HandleSee(ind) {
        setSeeKey((pre) => ({ ...pre, [ind]: !pre[ind] }));
    }

    return (
        <div className="flex-1 bg-black text-white p-4 sm:p-6 md:p-10">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold mb-2">
                Secret Recovery Phrase
            </h1>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">
                Save these words in a safe place.
            </p>

            {isWallet.length === 0 ?
                <form onSubmit={HandleSubmit} className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            name="UserInput"
                            placeholder="Enter your seed phrase"
                            className="bg-black border  border-gray-700 text-white px-4 py-2 w-full sm:w-80 md:w-96 rounded-xl focus:outline-none focus:border-white text-sm sm:text-base"
                            onChange={(e) =>
                                setForm({ ...Form, [e.target.name]: e.target.value })
                            }
                        />
                        <button
                            disabled={loading}
                            className="border rounded-lg border-gray-700 px-6 py-2 hover:bg-white hover:text-black transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                            {loading && (
                                <svg
                                    className="w-4 h-4 spinner"
                                    viewBox="0 0 24 24"
                                    fill="none">
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                                </svg>
                            )}
                            {loading ? "Generating..." : "Generate"}
                        </button>
                    </div>
                </form>
                : <div className="flex flex-wrap gap-3 mb-8 fade-in">
                    <button
                        disabled={loading}
                        className="border rounded-lg border-gray-700 px-4 sm:px-6 py-2 hover:bg-white hover:text-black transition-all text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        onClick={HandleClick}>
                        {loading && (
                            <svg className="w-4 h-4 spinner" viewBox="0 0 24 24" fill="none">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                            </svg>
                        )}
                        {loading ? "Adding..." : "Add Wallet"}
                    </button>
                    <button
                        className="border rounded-lg border-red-900 text-red-500 px-4 sm:px-6 py-2 hover:bg-red-500 hover:text-white transition-all text-sm sm:text-base"
                        onClick={clearAll}>
                        Clear All
                    </button>
                </div>
            }

            {mnemonic.length > 0 && (
                <div className="mb-8 cursor-pointer fade-in" onClick={copyMnemonic}>
                    <div className="flex justify-between items-center mb-3">
                        <p className="text-gray-500 text-xs sm:text-sm">MNEMONIC</p>
                        <span
                            className={`text-xs transition-all ${copied ? "text-green-500" : "text-gray-500"}`}>
                            {copied ? "✓ Copied!" : "Click to copy"}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        {mnemonic.map((val, ind) => (
                            <div
                                key={ind}
                                className={`mnemonic-word border rounded-lg border-gray-800 px-2 sm:px-3 py-2 text-xs sm:text-sm hover:border-gray-600 transition-all delay-${ind + 1}`}
                                style={{ animationDelay: `${ind * 0.05}s`}}>
                                <span className="text-gray-500 mr-1 sm:mr-2">{ind + 1}.</span>
                                {val}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {isWallet.length > 0 && (
                <div>
                    <p className="text-gray-500 text-xs sm:text-sm mb-3">WALLETS</p>
                    {isWallet.map((val, ind) => (
                        <div
                            key={ind}
                            className="wallet-card border rounded-lg border-gray-800 p-3 sm:p-4 mb-3 hover:border-gray-600 transition-all"
                            style={{ animationDelay: `${ind * 0.1}s` }}>
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex-1 min-w-0">
                                    <span className="text-gray-500 text-xs sm:text-sm">
                                        Public Key
                                    </span>
                                    <p className="font-mono text-xs sm:text-sm break-all">
                                        {val.publickey}
                                    </p>
                                </div>
                                <button
                                    className="text-gray-500 hover:text-red-500 text-sm px-2 flex-shrink-0"
                                    onClick={() => deleteWallet(ind)}>
                                    ✕
                                </button>
                            </div>
                            <div>

                                <span className="text-gray-500 text-xs sm:text-sm">
                                    Private Key
                                </span>

                                <div className="flex items-center justify-between">
                                    <p className="font-mono text-xs sm:text-sm break-all text-gray-400 mt-1">
                                        {seeKey[ind] ? val.privatekey : "•".repeat(87)}
                                    </p>
                                    <button
                                        className="text-gray-500 hover:text-white transition-all m-1"
                                        onClick={() => HandleSee(ind)}>
                                        {seeKey[ind] ?
                                            <FaRegEye className="w-4 h-4" />
                                            : <FaRegEyeSlash className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default Solana;
