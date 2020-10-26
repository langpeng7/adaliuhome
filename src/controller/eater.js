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
    let sql = `SELECT * FROM liubbr.visitors where`
    if(constructionId){
        sql+= ` constructionId = '${constructionId}' and`
    }
    if(bgTime){
        sql+= ` visitorTime >= '${bgTime}'` 
    }else{
        sql+= ` visitorTime >= '${lastMon}'` 
    }
    if(edTime){
        sql+= ` and visitorTime <= '${edTime}'` 
    }else{
        sql+= ` and visitorTime <= '${today}'` 
    }
    sql+=`Order By visitorTime Desc`
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
const deleteVisitor = (data) =>{
    const visitorId = data.visitorId
    let sql = `DELETE  FROM liubbr.visitors where id='${visitorId}'`
    return exec(sql)
}
const getVisitorDetail = (data) => {
    const visitorId = data.visitorId
    let sql = `SELECT * FROM liubbr.visitors where id='${visitorId}'`
    return exec(sql)
}


const savePic = (data) => {
    // id 就是要更新博客的 id
    // eaterData 是一个博客对象，包含 title content 属性
    // const countData = y.count; 
    let sqls = [];
    for(let i=0;i<data.length;i++){
        const uid = uuid.v1().toString();
        const name = data[i].csName;
        const job = data[i].csJob;
        const address = data[i].csAddress;
        const visitorTime = timeCon.dateFormat(new Date());
        const code =data[i].code;
        const visitorNum = data[i].visitorNum;
        const constructionId = data[i].constructionId;
        let pic1 =  data[i].csPic1;
        let pic1RandomName
        let pic1RandomNameIn
        if(pic1){
            let pic1Base64Data = pic1.replace(/^data:image\/\w+;base64,/, "")
            let pic1dataBuffer = new Buffer.from(pic1Base64Data, 'base64');
            pic1RandomName = './public/headImage/'+ random.randomString(8)+new Date().getTime() +".png"
            fs.writeFile(pic1RandomName, pic1dataBuffer, function(err) {
                if(err){
                    
                }else{
                 
                }
            });
            pic1RandomNameIn= pic1RandomName.substr(1)
        }
        let  pic2 =  data[i].csPic2;
        let pic2RandomName;
        let pic2RandomNameIn
        if(pic2){
    
            let pic2Base64Data = pic2.replace(/^data:image\/\w+;base64,/, "")
            let pic2dataBuffer = new Buffer.from(pic2Base64Data, 'base64');
             pic2RandomName = './public/headImage/'+ random.randomString(8)+new Date().getTime() +".png"
            fs.writeFile(pic2RandomName, pic2dataBuffer, function(err) {
                if(err){
                    
                }else{
                 
                }
            });
            pic2RandomNameIn = pic2RandomName.substr(1)
        }
        let  signPic =  data[i].csSignPic;
    
        let signPicRandomName;
        let signPicRandomNameIn
        if(signPic){
            let signPicBase64Data = signPic.replace(/^data:image\/\w+;base64,/, "")
            let signPicdataBuffer = new Buffer.from(signPicBase64Data, 'base64');
            signPicRandomName= './public/headImage/'+ random.randomString(8)+new Date().getTime() +".png"
            fs.writeFile(signPicRandomName, signPicdataBuffer, function(err) {
                if(err){
                    
                }else{
                 
                }
            });
            signPicRandomNameIn = signPicRandomName.substr(1)
        }
        sqls.push( `insert into liubbr.visitors(id,code,name,job,address,visitorNum,constructionId,pic1RandomName,pic2RandomName,signPicRandomName,visitorTime)values ('${uid}','${code}','${name}','${job}','${address}','${visitorNum}','${constructionId}','${pic1RandomNameIn}','${pic2RandomNameIn}','${signPicRandomNameIn}','${visitorTime}')`)
    }

    // const sql = `update z_eater_person set count='${countData}' where id=1`

    //const sqls = [`SELECT * FROM users;`,`SELECT * FROM users;`,`SELECT * FROM users;`]
    let sqlLen = 0

    function sqlsCircle(e){
		return	exec(e[sqlLen]).then(data=>{
			if(data.affectedRows>0){
				sqlLen ++
				if(sqlLen<sqls.length){
					sqlsCircle(sqls)
				}else{
					return exec(`SELECT * FROM users;`)
				}
			}else{
                return  exec(`SELECT * FROM users;`)
            }
		})
	}
    return sqlsCircle(sqls)

}
module.exports = {
    getList,
    updateCount,
    getVisitorDetail,
    savePic,
    deleteVisitor
}