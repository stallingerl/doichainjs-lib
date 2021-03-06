import { listTransactions } from "./listTransactions.js"
import { createRequire } from "module";
const require = createRequire(import.meta.url);


export const getBalanceOfAddresses = async (addressList, o_options) => {
    let options = {}
    if (o_options === undefined || o_options.network === undefined)
        options.network = global.DEFAULT_NETWORK
    else options = o_options

    let transactionCount = 0
    let addressObjectList = []
    let balance = 0

    for (const addr of addressList) {
        const transactions = await listTransactions(addr, options, addressList)

        let addressBalance = 0
        let txs = []
        if (transactions.length > 0) {
            transactionCount += transactions.length
            transactions.forEach((tx) => {
                if (tx.category === 'received') {
                    addressBalance = addressBalance + Number(tx.value)
                    balance = balance + Number(tx.value ? tx.value : 0)
                }
                if (tx.category === 'sent') {
                    addressBalance = addressBalance + Number(tx.value) + Number(tx.fee)
                    balance = balance + Number(tx.value ? tx.value : 0) + Number(tx.fee ? tx.fee : 0)
                }
                txs.unshift(tx)
            })
        }
        addressObjectList.push({
            address: addr,
            balance: addressBalance,
            transactions: txs
        })
    }

    const retValue = {
        transactionCount: transactionCount,
        addresses: addressObjectList,
        balance: balance
    }

    //await global.client.close();
    //console.log("closed ECL Server")
    return retValue
}
