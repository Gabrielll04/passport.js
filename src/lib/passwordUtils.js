const crypto = require('crypto')

function genPassword(password){
    var salt = crypto.randomBytes(32).toString('hex')//randomBytes generates a artificial random number, the firts parameter are the size. toString turn the randomBytes in a hexadecial string
    var genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')//1000 indica que a função será executada x vezes para gerar uma chave derivada. 64 indica o tamanho da chave em bytes. 'sha512' especifica que a função deve usar o algoritmo de hash SHA-512 para gerar a chave. No final, transformamos a chave em uma string hexadecimal, útil para armazenas e transmitir a chave de forma segura. PBKDF2 diz que a senha é derivada de senha

    return {
        salt: salt,
        genHash: genHash
    }
}

function validPassword(password, hash, salt){
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
    return hash === hashVerify
}

module.exports = {
    validPassword: validPassword,
    genPassword: genPassword
}