import { createHdKeyFromMnemonic, generateMnemonic, encryptAES, decryptAES } from 'doichainjs-lib';
import { s } from "./sharedState.js";
import path from 'path'
const __dirname = path.resolve('./');
import fs from 'fs';


export async function createOrReadSeed(id, password) {
    const password = "yourPassword"
    var seed 
    var hdkey
    return new Promise((res, rej) => {
        let filename = `${__dirname}/encryptedS${id}.txt`
        try {
            if (fs.existsSync(filename)) {
                console.log("Seed phrase exists")
                fs.readFile(filename, 'utf8', async function (err, data) {
                    seed = decryptAES(data, s.password)
                    // generate hd key 
                    hdkey = createHdKeyFromMnemonic(s.seed, s.password)
                    console.log("Read Existing Seed from storage");
                    res(seed, hdkey)
                });
            } else {
                throw err
            }
        } catch (err) {
            console.log("No Seed yet. Creating new one")

            seed = generateMnemonic();

            // generate hd key and encrypt with password
            hdkey = createHdKeyFromMnemonic(seed, password)
            const encryptedS = encryptAES(seed, password)

            // save in local file 

            fs.writeFile(filename, `${encryptedS}`, function (err) {
                if (err) throw err;
                console.log('Saved new encrypted seed phrase!');
                res(seed, hdkey)
            });
        }
    })
}

