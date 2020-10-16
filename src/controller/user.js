const { exec, escape,unloginExec } = require('../db/mysql')
// const { genPassword } = require('../utils/cryp')

const login = (username, password) => {
    // username = escape(username)
    
    // 生成加密密码
    // password = genPassword(password)
    // password = escape(password)
    const sql = `
        select username, realname from liubbr.users where username='${username}' and password='${password}'
    `

    return exec(sql).then(rows => {
        return rows[0] || {}
    })
}
const loginOut =(e) =>{
    return unloginExec(e).then(rows=>{
        return rows[0]||{}
    })
}

module.exports = {
    login,
    loginOut
}