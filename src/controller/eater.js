const { exec } = require('../db/mysql')
const uuid = require('uuid');
let  random  = require('../auto/randomString')
const fs = require('fs');
let  timeCon  = require('../conf/common')


const getList = (data) => {
  
    const bgTime = data.bgTime?data.bgTime+"":null
    const edTime = data.edTime?data.edTime+"":null
    const today = timeCon.dateFormat(new Date())
    const constructionId = data.constructionId?data.constructionId:null
    //上个月                                                                        //月数
    const lastMon = timeCon.dateFormat(new Date((new Date().getTime() - 86400000*30*6)))
    let sql = `SELECT * FROM user.visitors where`
    if(constructionId){
        sql+= ` constructionId = '${constructionId}' and`
    }
    if(bgTime){
        sql+= ` visitorTime >= '${bgTime}'` 
    }else{
        sql+= ` visitorTime >= '${lastMon}'` 
    }
    if(edTime){
        sql+= ` and visitorTime < '${edTime}'` 
    }else{
        sql+= ` and visitorTime < '${today}'` 
    }
    console.log(sql)
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
    const visitorTime = timeCon.dateFormat(new Date());
    let  pic1 = data.csPic1;
    let pic1RandomName
    const code ="";
    const visitorNum = "";
    const constructionId = "";
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
  
    
    const sql = `insert into visitors(id,code,name,job,address,visitorNum,constructionId,pic1RandomName,pic2RandomName,signPicRandomName,visitorTime)values ('${uid}','${code}','${name}','${job}','${address}','${visitorNum}','${constructionId}','${pic1RandomName}','${pic2RandomName}','${signPicRandomName}','${visitorTime}')`;
    console.log(sql)
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