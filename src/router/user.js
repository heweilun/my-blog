const handleUserRouter = (req, res) => {
    //用户的路由处理 登陆

    if(req.method === "POST" && req.path === "/api/user/login") {
        return {
            msg: "这是博客用户登陆的接口"
        }
    }

}

module.exports = handleUserRouter