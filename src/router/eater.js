const {
    login,
    getList,
    updateCount,
    getVisitorDetail,
    savePic,
} = require('../controller/eater')
const { SuccessModel, ErrorModel } = require('../model/resModel')

//统一登录验证函数
const loginCheck = (req) =>{
    if(!req.session.username){
        return Promise.resolve(new ErrorModel('尚未登陆'))
    }
}

const handleeaterRouter = (req, res) => {
    
    const method = req.method // GET POST

    // 获取吃饭数量列表
    if (method === 'GET' && req.path === '/api/list') {
        const result = getList(req.query)
       
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

    // 获取吃饭数量列表
    if (method === 'GET' && req.path === '/api/getVisitorDetail') {
        console.log(req.query)
        const result = getVisitorDetail(req.query)
        console.log(result)
        return result.then(val => {
            return new SuccessModel({data:val})
        })
    }


    if (method === 'POST' && req.path === '/api/savePic') {
        // const loginCheckResult = loginCheck(req)
        // if(loginCheckResult){
        //     //这里应该跳转登录页
        //     return loginCheck
        // }

        const result = savePic(req.body)
        return result.then(val => {
       
            if (val) {
                return new SuccessModel(
                   {data:val}
                )
            } else {
                return new ErrorModel('保存图片失败')
            }
            return new SuccessModel(val)
        })
    }


    if (method === 'POST' && req.path === '/api/update') {
        const result = updateCount(req.body)
        return result.then(val => {
            if (val) {
                return new SuccessModel(
                   {count:val[0].count}
                )
            } else {
                return new ErrorModel('更新博客失败')
            }
        })
    }
}

module.exports = handleeaterRouter