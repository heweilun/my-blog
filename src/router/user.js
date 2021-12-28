const {
    loginCheck
} = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")

const handleUserRouter = (req, res) => {
    //用户的路由处理 登陆

    if(req.method === "POST" && req.path === "/api/user/login") {
        const sqlData = loginCheck(req.body)
        return sqlData.then(responseData => {
            //数据查询返回的都是数组类型
            if(responseData.length > 0 && responseData[0].username){
                return new SuccessModel(responseData[0])
            }else {
                return new ErrorModel("登陆错误")
            }
        })
    }

}

module.exports = handleUserRouter