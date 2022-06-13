import { generateMnemonic, createHdKeyFromMnemonic, createNewWallet, network } from "doichainjs-lib"
import ElectrumClient from "@codewarriorr/electrum-client-js"


async function createsWallet() {

    global.DEFAULT_NETWORK = network.DOICHAIN_REGTEST

    const seed = generateMnemonic();
    const password = "yourPassword"
    const hdkey = createHdKeyFromMnemonic(seed, password)
    
    const id = "yourWalletName"
    const addrType = "p2wpkh"

    switch (addrType){
      case "p2pkh": 
        purpose = "m/44"
        break;
      case "p2sh":
        purpose = "m/49"
        break;
      case "p2wpkh":
        purpose = "m/84"
        break;
    }

    const coinType = global.DEFAULT_NETWORK.name == "mainnet" ? 0 : 1

    global.client = new ElectrumClient("172.22.0.6", 50002, "ssl");
    try {seed = generateMnemonic();
        await global.client.connect(
            "electrum-client-js", // optional client name
            "1.4.2" // optional protocol version
        )
    } catch (err) {
        console.error(err);
    }

    let o_options
    const wallet = await createNewWallet(hdkey, purpose, coinType, o_options, addrType, id)
    console.log("successfully created Wallet ")
}