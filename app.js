const querystring = require('querystring')
const handleEaterRouter = require('./src/router/eater')
const handleUserRouter = require('./src/router/user')
const cleanC = require('./src/auto/cleanCount')
const getCookieExpires = () =>{
    const d = new Date()
     d.setTime(d.getTime() + (24*60*60*1000))
    return d.toGMTString()
}
const SESSION_DATA = {}
// 用于处理 post data
const getPostData = (req) => {
    const promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
             postData += chunk.toString()
        })
        req.on('end', () => {
           
            if (!postData) {
                resolve({})
                return
            }
            resolve(
                JSON.parse(postData)
            )

    
        })
    })
    return promise
}

const serverHandle = (req, res) => {

    // 设置返回格式 JSON
    res.setHeader('content-type', 'application/json')

    // 获取 path
    const url = req.url
    req.path = url.split('?')[0]
    // 解析 query
    req.query = querystring.parse(url.split('?')[1])

    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie||''
    cookieStr.split(';').forEach(item=>{
        if(!item){
            return
        }
        const arr = item.split('=');
        const key = arr[0].trim();
        const val = arr[1].trim();
        req.cookie[key] = val
    })

    // 解析 session 
    let needSetCookie = false
    let userId = req.cookie.userid
    if(userId){
        if(!SESSION_DATA[userId]){
            SESSION_DATA[userId] = {}
        }else{
            req.session = SESSION_DATA[userId]
        }
     
    }else{
        needSetCookie = true
        userId = `${Date.now()} +${Math.random()}`
        SESSION_DATA[userId] = {}
     
    }
    req.session = SESSION_DATA[userId]
    getPostData(req).then(postData=>{
        req.body = postData 
        // 处理 eater 路由
        const eaterResult = handleEaterRouter(req, res)

        if (eaterResult) {
            eaterResult.then(eaterData => {
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(eaterData)
                )
            })
            return
        }


        const userResult = handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData => {
                if(needSetCookie){
                    res.setHeader('Set-Cookie',`userid=${userId};path=/;httpOnly;expires=${getCookieExpires()}`)
                }
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

    })
}

// cleanC.gogogo();
module.exports = serverHandle