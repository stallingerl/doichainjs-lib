import { createDoiWallet } from "./createDoiWallet.js"
import { createAndSendTransaction } from "doichainjs-lib"
import { createOrReadSeed } from "./createOrReadSeed.js"


async function broadcastTransaction() {

    const password = "yourPassword"
    const addrType = "p2wpkh"
    let id = "yourWalletName"
    let decryptedSeedPhrase = createOrReadSeed(id)
    let our_wallet = createDoiWallet(password, addrType, decryptedSeedPhrase)

    let destAddress
    let amount = 5 // 5 DOI
    let nameId = "my test Id" // can be empty
    let nameValue = "xyz" // can be empty

    // Check if there are still enough Doi in the wallet for the name tx
    //await checkBalance(global.url);
    const txResponse = await createAndSendTransaction(decryptedSeedPhrase,
        password,
        amount,
        destAddress,
        our_wallet,
        nameId,
        nameValue,
        addrType)
    console.log("txResponse", txResponse)
}