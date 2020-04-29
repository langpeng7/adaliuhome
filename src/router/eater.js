const {
    getList,
    updateCount,
} = require('../controller/eater')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleeaterRouter = (req, res) => {
    
    const method = req.method // GET POST

    // 获取吃饭数量列表
    if (method === 'GET' && req.path === '/electron/eat/list') {
        const result = getList()
        return result.then(listData => {
            console.log(listData)
            return new SuccessModel(listData)
        })
    }
 
    if (method === 'POST' && req.path === '/electron/eat/update') {
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