const { exec } = require('../db/mysql')

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
const updateVisitor = (data) => {

    const visitorId = data.visitorId
    const code = data.code
    const name = data.csName
    const job = data.csJob
    const address = data.csAddress
    const visitorNum = data.visitorNum
    const constructionId = data.constructionId
    const faccommodation = data.faccommodation
    const destination = data.destination
    const pic1 = data.csPic1;
    const pic2 = data.csPic2;
    let pic1RandomName;
    let pic2RandomName;
    if(pic1){
        let pic1Base64Data = pic1.replace(/^data:image\/\w+;base64,/, "")
        let pic1dataBuffer = new Buffer.from(pic1Base64Data, 'base64');
        pic1RandomName = './public/headImage/'+ random.randomString(8)+new Date().getTime() +".png"
        fs.writeFile(pic1RandomName, pic1dataBuffer, function(err) {
            if(err){
                
            }else{
             
            }
        });
        pic1RandomName= pic1RandomName.substr(1)
    }
   
    if(pic2){
        let pic2Base64Data = pic2.replace(/^data:image\/\w+;base64,/, "")
        let pic2dataBuffer = new Buffer.from(pic2Base64Data, 'base64');
        pic2RandomName = './public/headImage/'+ random.randomString(8)+new Date().getTime() +".png"
        fs.writeFile(pic2RandomName, pic2dataBuffer, function(err) {
            if(err){
                
            }else{
             
            }
        });
        pic2RandomName= pic2RandomName.substr(1)
    }


    const sql = `update liubbr.visitors set code='${code}', name='${name}',job='${job}',
    address='${address}', visitorNum='${visitorNum}',constructionId='${constructionId}',
    faccommodation='${faccommodation}',destination='${destination}',
    pic1RandomName='${pic1RandomName}',
    pic2RandomName='${pic2RandomName}'
    where id='${visitorId}'`
    return exec(sql).then(updateData => {
        console.log(updateData)
        if (updateData.affectedRows > 0) {
            return exec(`SELECT * FROM liubbr.visitors where id='${visitorId}';`)
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
        const uuid = require('uuid');
        const uid = uuid.v1().toString();
        const name = data[i].csName;
        const job = data[i].csJob;
        const address = data[i].csAddress;
        const visitorTime = timeCon.dateFormat(new Date());
        const code =data[i].code;
        const visitorNum = data[i].visitorNum;
        const constructionId = data[i].constructionId;
        const faccommodation = data[i].faccommodation;
        const destination = data[i].destination;
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
        sqls.push( `insert into liubbr.visitors(id,code,name,job,address,visitorNum,constructionId,pic1RandomName,pic2RandomName,signPicRandomName,visitorTime,faccommodation,destination)values ('${uid}','${code}','${name}','${job}','${address}','${visitorNum}','${constructionId}','${pic1RandomNameIn}','${pic2RandomNameIn}','${signPicRandomNameIn}','${visitorTime}','${faccommodation}','${destination}')`)
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
    updateVisitor,
    getVisitorDetail,
    savePic,
    deleteVisitor,
    
}