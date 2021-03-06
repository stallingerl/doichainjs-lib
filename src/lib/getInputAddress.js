import { createRequire } from "module"; 
const require = createRequire(import.meta.url); 
const bitcoin = require("bitcoinjs-lib")

const getInputAddressFromWitness = (input) => {
  if (input.witness !== undefined) {
    let witness = input.witness;
    let obj = bitcoin.payments.p2wpkh({ witness })    
    return obj.address;
  }
  return false
}

export const getInputAddress = async (address, o_options) => { 
  let options = {}
  if(o_options===undefined || o_options.network===undefined)
      options.network=bitcoin.networks.bitcoin
  else options.network = o_options.network
  const script = bitcoin.address.toOutputScript(address,options.network);
  const hash = bitcoin.crypto.sha256(script);
  let reversedHash = new Buffer.from(hash.reverse());
  console.log(address, " maps to ", reversedHash.toString("hex"))

  const inputAddress = [];

  try {

    const history = await global.client.blockchain_scripthash_getHistory(
      reversedHash.toString("hex")
    );

    for (const tx of history) {
      const transaction = await global.client.blockchain_transaction_get(tx.tx_hash);
      const decryptedTx = bitcoin.Transaction.fromHex(transaction);

      for (const input of decryptedTx.ins) {
        inputAddress.push(await getInputAddressFromWitness(input));
      }
    }
    //console.log("inputAddress", inputAddress);
    // global.client.close();
  } catch (err) {
    console.error(err);
  }

  return inputAddress;
};
export default getInputAddress
