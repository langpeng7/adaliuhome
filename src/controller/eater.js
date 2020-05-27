const { exec } = require('../db/mysql')
const uuid = require('uuid');
let  random  = require('../auto/randomString')
const fs = require('fs');
const getList = () => {
     // sql = `SELECT count FROM z_eater_person where id=1;`
    let sql = `SELECT * FROM users where id=1;`
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
    // const countData = y.count;
    const uid = uuid.v1().toString();
    const name = data.csName;
    const job = data.csJob;
    const address = data.csAddress;
    
    let  pic1 = data.csPic1;
    let pic1RandomName

    if(pic1){
        let pic1Base64Data = pic1.replace(/^data:image\/\w+;base64,/, "")
        let pic1dataBuffer = new Buffer.from(pic1Base64Data, 'base64');
        pic1RandomName = './public/headImage/'+ random.randomString(8)+new Date().getTime() +".png"
        fs.writeFile(pic1RandomName, pic1dataBuffer, function(err) {
            if(err){
                
            }else{
             
            }
        });
    }
    let  pic2 = data.csPic2;
    let pic2RandomName;
    if(pic2){

        let pic2Base64Data = pic2.replace(/^data:image\/\w+;base64,/, "")
        let pic2dataBuffer = new Buffer.from(pic2Base64Data, 'base64');
         pic2RandomName = './public/headImage/'+ random.randomString(8)+new Date().getTime() +".png"
        fs.writeFile(pic2RandomName, pic2dataBuffer, function(err) {
            if(err){
                
            }else{
             
            }
        });
    }
    let  signPic = data.csSignPic;
    console.log(signPic)
    let signPicRandomName;
    if(signPic){
        let signPicBase64Data = signPic.replace(/^data:image\/\w+;base64,/, "")
        let signPicdataBuffer = new Buffer.from(signPicBase64Data, 'base64');
        signPicRandomName= './public/headImage/'+ random.randomString(8)+new Date().getTime() +".png"
        fs.writeFile(signPicRandomName, signPicdataBuffer, function(err) {
            if(err){
                
            }else{
             
            }
        });
    }
  
    
    const sql = `insert into users(id,name,job,address,pic1RandomName,pic2RandomName,signPicRandomName)values ('${uid}','${name}','${job}','${address}','${pic1RandomName}','${pic2RandomName}','${signPicRandomName}')`;
    // const sql = `update z_eater_person set count='${countData}' where id=1`
    return exec(sql).then(data => {

        if (data.affectedRows > 0) {
            return exec(`SELECT * FROM users;`)
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