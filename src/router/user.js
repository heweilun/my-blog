const {
    loginCheck
} = require("../controller/user")
const { SuccessModel, ErrorModel } = require("../model/resModel")

const handleUserRouter = (req, res) => {
    //用户的路由处理 登陆

    if(req.method === "POST" && req.path === "/api/user/login") {
        const responseData = loginCheck(req.body)
        if(responseData) {
            return new SuccessModel()
        }else {
            return new ErrorModel("登陆失败")
        }
    }

}

module.exports = handleUserRouter