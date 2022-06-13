import * as constants from "./src/lib/constants.js"
import { createHdKeyFromMnemonic } from "./src/lib/createHdKeyFromMnemonic.js"
import { createAndSendTransaction } from "./src/lib/createAndSendTransaction.js"
import { createNewWallet } from "./src/lib/createNewWallet.js"
import { generateMnemonic  } from "./src/lib/generateMnemonic.js"
import { decryptAES } from "./src/lib/decryptAES.js"
import { encryptAES } from "./src/lib/encryptAES.js"
import { getPathsOfAddresses, returnUnusedAddress } from './src/lib/getAddress.js'
import { getBalanceOfAddresses } from "./src/lib/getBalanceOfAddresses.js"
import { getBalanceOfWallet } from "./src/lib/getBalanceOfWallet.js"
import getInputAddress from "./src/lib/getInputAddress.js"
import { getUnspents } from "./src/lib/getUnspents.js"
import { isOurAddress } from './src/lib/isOurAddress.js'
import { isOurChangeAddress } from './src/lib/isOurChangeAddress.js'
import { listTransactions } from "./src/lib/listTransactions.js"
import * as network from './src/lib/network.js'
import { sendToAddress } from "./src/lib/sendToAddress.js"



export {
  constants,
  network,
  getPathsOfAddresses,
  returnUnusedAddress,
  getInputAddress,
  createHdKeyFromMnemonic,
  createAndSendTransaction,
  createNewWallet,
  generateMnemonic,
  listTransactions,
  getBalanceOfAddresses,
  getBalanceOfWallet,
  decryptAES,
  encryptAES,
  isOurAddress,
  isOurChangeAddress,
  sendToAddress,
  getUnspents,
}
