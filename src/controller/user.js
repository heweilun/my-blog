const { exec } = require('../db/mysql')

const login = (postData) => {
    const {username, password} = postData
    let sql = `select username, realname from users where username='${username}' and password='${password}'`
    return exec(sql)
}

const register = (postData) => {
    const {username, password} = postData
    let sql = `insert into users (username, password) 
    values ('${username}', '${password}')`
    return exec(sql)
}

module.exports = {
    login,
    register
}