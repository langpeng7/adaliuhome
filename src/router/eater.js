const {
    getList,
    updateCount,
    addConsumer,
    savePic,
} = require('../controller/eater')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleeaterRouter = (req, res) => {
    
    const method = req.method // GET POST

    // 获取吃饭数量列表
    if (method === 'GET' && req.path === '/api/list') {
        const result = getList()
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }
    //  // 获取吃饭数量列表
    //  if (method === 'POST' && req.path === '/electron/eat/add') {
    //     const result = addConsumer(req.body)
    //     return result.then(val => {
       
    //         if (val) {
    //             return new SuccessModel(
    //                {data:val}
    //             )
    //         } else {
    //             return new ErrorModel('新增用户信息失败')
    //         }
    //         return new SuccessModel(val)
    //     })
    // }

    if (method === 'POST' && req.path === '/api/savePic') {
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