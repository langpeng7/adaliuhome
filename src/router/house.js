const {
    getHouseList,
} = require('../controller/house')
const { SuccessModel, ErrorModel } = require('../model/resModel')


const handleHouseRouter = (req, res) => {
    const method = req.method // GET POST
    if (method === 'GET' && req.path === '/api/houseList') {
        const result = getHouseList(req.query)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }

}

module.exports = handleHouseRouter