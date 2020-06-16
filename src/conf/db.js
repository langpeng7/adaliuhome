const env = process.env.NODE_ENV  // 环境参数

// 配置
let MYSQL_CONF

if (env === 'production') {

    // mysql
    // MYSQL_CONF = {
    //     host: '39.106.206.173',
	//     user: 'udzzf',
	//     post:'3306',
	//     password: 'qwer1015',
	//     database: 'mtjh'
    // }
    MYSQL_CONF = {
        host: 'localhost',
	    user: 'root',
	    post:'3306',
	    password: '2929001557',
	    database: 'liubbr'
    }
}

if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
	    user: 'root',
	    post:'3306',
	    password: '123456',
	    database: 'user'
    }

    // MYSQL_CONF = {
    //     host: '39.106.206.173',
	//     user: 'udzzf',
	//     post:'3306',
	//     password: 'qwer1015',
	//     database: 'mtjh'
    // }

}



module.exports = {
    MYSQL_CONF
}