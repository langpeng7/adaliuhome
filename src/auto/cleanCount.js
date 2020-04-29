const {
    updateCount,
} = require('../controller/eater')
const schedule = require('node-schedule');
const gogogo = () => {
    schedule.scheduleJob('1 1 17 * * *', function(){
        updateCount({count:0})
    })

}

module.exports={
    gogogo
}