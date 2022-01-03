const {
    login
} = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")


const handleUserRouter = (req, res) => {
    //用户的路由处理 登陆

    if(req.method === "GET" && req.path === "/api/user/login") {
        const sqlData = login(req.query)
        return sqlData.then(responseData => {
            //数据查询返回的都是数组类型
            if(responseData.length > 0 && responseData[0].username){
                req.session.username = responseData[0].username
                req.session.realname = responseData[0].realname
                return new SuccessModel(responseData[0])
            }else {
                return new ErrorModel("登陆错误")
            }
        })
    }

}

module.exports = handleUserRouter