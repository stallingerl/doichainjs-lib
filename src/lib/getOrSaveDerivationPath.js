import { createRequire } from "module";
const require = createRequire(import.meta.url);
var fs = require('fs');
import path from 'path'
const __dirname = path.resolve('./');
var dir = './derivationPaths';

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}


export async function saveAddress(purpose, derivationPath, address, id) {
    let filename = `${__dirname}/derivationPaths/${purpose.replace("/", "")}-${id}.txt`

    return new Promise((res, rej) => {
        // existiert das File mit derPaths?
        if (fs.existsSync(filename)) {
            console.log("Derivation File exists")
            res()
        } else {
            console.log("No addresses saved yet. Creating new derivationPath file")
            // save in local file 
            if (address !== undefined) {
                fs.writeFile(filename, "", function (err) {
                    if (err) {
                        rej(err);
                    } else {
                        console.log('Generated derivationPaths file');
                        res()
                    }
                });
            }
        }
    }).then(() => {
        // wenn ja, dann ließ das File
        return new Promise((res, rej) => {
            fs.readFile(filename, 'utf8', async function (err, data) {
                if (err) {
                    throw err
                } else {
                    console.log(data);
                    res(data)
                }
            });
        })
    }).then((data) => {
        // wenn das File gelesen ist neuen derPath anfügen
        return new Promise((res, rej) => {
            if (data !== undefined) {
                // check if new address is already in local storage. If yes return derivationPath
                if (data.indexOf(address) !== -1) {
                    console.log("address already saved.")
                    res()
                }

                let newDerivationPath = derivationPath
                let dataParts = data.split(";")
                let index = dataParts[dataParts.length - 1].split(",")[0]

                if (address !== undefined) {
                    let newLine = `;${++index}, ${newDerivationPath}, ${address}  \r\n`
                    fs.appendFile(filename, newLine, function (err) {
                        if (err) {
                            throw err;
                        } else {
                            console.log('Appended new address and derivationPath to local storage!');
                            res()
                        }
                    });
                }
            }
        })
    }, (err) => {
        console.log(err)
    })
}

export async function getSavedAddresses(purpose, id) {
    return new Promise((res, rej) => {
        let filename = `${__dirname}/derivationPaths/${purpose.replace("/", "")}-${id}.txt`
        try {
            if (fs.existsSync(filename)) {
                console.log("Derivation File exists")
                fs.readFile(filename, 'utf8', async function (err, data) {

                    var rl = require('readline').createInterface({
                        input: require('fs').createReadStream(filename),
                    });
                    // Note: we use the crlfDelay option to recognize all instances of CR LF
                    // ('\r\n') in input.txt as a single line break.

                    let pathsAndAddresses = []

                    // check if new address is already in local storage. If yes return derivationPath
                    for await (const line of rl) {
                        // Each line in input.txt will be successively available here as `line`.
                        let lineParts = line.split(",")
                        let readDerivationPath = lineParts[1].trim()
                        let readAddress = lineParts[2].trim()
                        pathsAndAddresses.push({ readDerivationPath, readAddress })
                    }
                    res(pathsAndAddresses)

                });
            } else {
                throw err
            }
        } catch (err) {
            console.log("No addresses saved yet. Create new derivationPath file")
            res()
        }
    })
}