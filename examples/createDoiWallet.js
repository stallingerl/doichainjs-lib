import { generateMnemonic, createHdKeyFromMnemonic, createNewWallet, network } from "doichainjs-lib"
import ElectrumClient from "@codewarriorr/electrum-client-js"


export async function createDoiWallet(password, addrType, seed) {

  global.DEFAULT_NETWORK = network.DOICHAIN_TESTNET

  let seed = this.seed
  // or use function createOrReadSeed(id)
  if (!seed) {
    seed = generateMnemonic();
    const hdkey = createHdKeyFromMnemonic(seed, password)
  }

  const id = "yourWalletName"


  switch (addrType) {
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

  // TESTNET URL: 157.90.175.84 (spotty-goat-4.doi.works)
  // MAINNET URL: 157.90.126.249 (big-parrot-60.doi.works)
  global.client = new ElectrumClient("157.90.175.84", 50002, "ssl");
  try {
    seed = generateMnemonic();
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