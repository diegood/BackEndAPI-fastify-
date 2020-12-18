const bcrypt = require('bcrypt');

async function hashPassword(pwd) {
    const saltRounds = 10;
    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(pwd, saltRounds, function(err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    return hashedPassword;
} 

async function comparePassword(pwd, hash) {

    const comparedPassword = await new Promise((resolve, reject) => {
        bcrypt.compare(pwd, hash, function(err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    return comparedPassword;
}

module.exports = {
    hashPassword,
    comparePassword,
}

