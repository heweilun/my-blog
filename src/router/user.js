const {
    login
} = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")
const {redisSet} = require('../db/redis')


const handleUserRouter = (req, res) => {
    //用户的路由处理 登陆

    if(req.method === "POST" && req.path === "/api/user/login") {
        const sqlData = login(req.body)
        return sqlData.then(responseData => {
            //数据查询返回的都是数组类型
            if(responseData.length > 0 && responseData[0].username){
                req.session.username = responseData[0].username
                req.session.realname = responseData[0].realname
                //同步到redis
                redisSet(req.sessionId, {
                    username: responseData[0].username,
                    realname: responseData[0].realname
                })
                return new SuccessModel(responseData[0])
            }else {
                return new ErrorModel(null,"账户或密码错误")
            }
        })
    }

    if(req.method === "POST" && req.path === "/api/user/register") {
        const sqlData = register(req.body)
        return sqlData.then(responseData => {
            console.log(responseData)
            if(responseData) {
                return new SuccessModel(responseData, 'success')//返回新建的数据id
            }else {
                return new ErrorModel(null, "账户注册失败")
            }
        })
    }
}

module.exports = handleUserRouter