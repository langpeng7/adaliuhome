const querystring = require('querystring')
const handleeaterRouter = require('./src/router/eater')
const cleanC = require('./src/auto/cleanCount')

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
    getPostData(req).then(postData=>{
        
        req.body = postData 
        // 处理 eater 路由
        const eaterResult = handleeaterRouter(req, res)

        if (eaterResult) {
            eaterResult.then(eaterData => {
                res.end(
                    JSON.stringify(eaterData)
                )
            })
            return
        }
    })
}

// cleanC.gogogo();
module.exports = serverHandle