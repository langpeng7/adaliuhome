const { exec } = require('../db/mysql')
const uuid = require('uuid');
let  random  = require('../auto/randomString')
const fs = require('fs');
const getList = () => {
    //let sql = `SELECT count FROM z_eater_person where id=1;`
    let sql = `SELECT email FROM consumerinfo where id=1;`
    return exec(sql)
}



const updateCount = (eaterData) => {
    // id 就是要更新博客的 id
    // eaterData 是一个博客对象，包含 title content 属性
    const countData = eaterData.count
    const sql = `update z_eater_person set count='${countData}' where id=1`
    return exec(sql).then(updateData => {
        if (updateData.affectedRows > 0) {
            return exec(`SELECT count FROM z_eater_person where id=1;`)
        }
        return false
    })
}

const addConsumer = (data) => {
    console.log(data)
    // id 就是要更新博客的 id
    // eaterData 是一个博客对象，包含 title content 属性
    // const countData = eaterData.count;
    const uid = uuid.v1().toString();
    const name = data.name;
    const email = data.email;
    const address = data.address;

    const sql = `insert into consumerinfo(id,email,name,address)values ('${uid}','${email}','${name}','${address}')`;
    // const sql = `update z_eater_person set count='${countData}' where id=1`
    return exec(sql).then(data => {

        if (data.affectedRows > 0) {
            return exec(`SELECT * FROM consumerinfo;`)
        }
        return false
    })
}


const savePic = (data) => {
   
    // id 就是要更新博客的 id
    // eaterData 是一个博客对象，包含 title content 属性
    // const countData = eaterData.count;
    const uid = uuid.v1().toString();
    const name = data.name;
    const email = data.email;
    const address = data.address;
    let  imgData = data.imgData;
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "")
    let dataBuffer = new Buffer(base64Data, 'base64');
    const picRandomName = '/public/headImage/'+ random.randomString(8)+new Date().getTime() +".png"
    console.log(data)
    fs.writeFile(picRandomName, dataBuffer, function(err) {
        if(err){
            
        }else{
         
        }
    });

    
    const sql = `insert into consumerinfo(id,email,name,address,pic1)values ('${uid}','${email}','${name}','${address}','${picRandomName}')`;
    // const sql = `update z_eater_person set count='${countData}' where id=1`
    return exec(sql).then(data => {

        if (data.affectedRows > 0) {
            return exec(`SELECT * FROM consumerinfo;`)
        }
        return false
    })
}
module.exports = {
    getList,
    updateCount,
    addConsumer,
    savePic
}