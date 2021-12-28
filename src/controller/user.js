const { exec } = require('../db/mysql')

const loginCheck = (postData) => {
    const {username, password} = postData
    let sql = `select username, realname from users where username='${username}' and password='${password}'`
    return exec(sql)
}

module.exports = {
    loginCheck
}