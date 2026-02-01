/** @format */

const express = require("express");
const app = express();
const cors = require("cors");
// this is for the public and private key and generate the mnemonic
const {
  generateMnemonic,
  validateMnemonic,
  mnemonicToSeedSync,
} = require("bip39");
const bs58 = require("bs58").default;
const nacl = require("tweetnacl");
const { derivePath } = require("ed25519-hd-key");
const { Keypair } = require("@solana/web3.js");

app.use(cors({
    origin:"*"
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.post('/' , (req  ,res)=>{
    let form = req.body.UserInput;
    let count = Number(req.body.count) || 0;
    let mnemonic;
    if(!form)
    {
        mnemonic = generateMnemonic();
    }
    else
    {
        if(validateMnemonic(form))
            mnemonic = form
        else
            return res.status(400).json({message:"Mnemonic is not valid"})
    }

    // mnemonic convert into seed
    const seed = mnemonicToSeedSync(mnemonic)
    // to create the path
    const path = `m/44'/501'/${count}'/0'`;


    // isse hum multipul wallet create kr sakte h;
    const derivedSeed = derivePath(path , seed.toString('hex')).key
    // generate the key pair;
    const keyPair = nacl.sign.keyPair.fromSeed(derivedSeed)

    // to find the secretKey
    const secretkey = keyPair.secretKey;

    // to find the public key
    const public = Keypair.fromSecretKey(secretkey).publicKey.toBase58()

    // to find the private key;
    const private = bs58.encode(secretkey);
    // res.send(bs58.encode(secretkey))


    res.status(200).json({
        public:public,
        private:private,
        mnemonic: mnemonic,
    })
})


app.get('/' , (req ,res)=>{
    res.send("Server is running. ALL GOOD.........")
})

app.listen(4000, () => console.log("server is startd at port 4000"));
