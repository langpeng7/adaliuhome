const { exec } = require('../db/mysql')
const uuid = require('uuid');
let  random  = require('../auto/randomString')
const fs = require('fs');
let  timeCon  = require('../conf/common')


const getHouseList = (data) => {
    let sql = `SELECT * FROM liubbr.house`
    return exec(sql)
}

module.exports = {
    getHouseList
}