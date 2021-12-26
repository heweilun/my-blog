// 配置
const env = process.env.NODE_ENV//环境变量
let MYSQL_CONF

if(env === 'development'){
    MYSQL_CONF = {
        host: "localhost",//ip
        user: 'root',//用户名
        password: 'admin123456',//密码
        port: '3306',//端口
        database: 'myblog',//数据库名
    }
}

if(env === 'production'){
    MYSQL_CONF = {
        host: "localhost",
        user: 'root',
        password: 'Hikvision110.',
        port: '3306',
        database: 'myblog',
    }
}

module.exports = {
    MYSQL_CONF
}