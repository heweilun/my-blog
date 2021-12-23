const { getList } = require("../controller/blog")
const { SuccessModel, ErrorModel } = require("../model/resModel")

const handleBlogRouter = (req, res) => {
    //博客的路由处理 查询 详情 新建 删除

    if(req.method === "GET" && req.path === "/api/blog/list") {
        const { author, keyword } = req.query || {}
        const responseData = getList(author || "", keyword || "")
        return new SuccessModel(responseData)
        // new ErrorModel(null,responseData)
    }

    if(req.method === "GET" && req.path === "/api/blog/detail") {
        return {
            msg: "这是博客详情获取的接口"
        }
    }

    if(req.method === "POST" && req.path === "/api/blog/new") {
        return {
            msg: "这是新建博客的接口"
        }
    }

    if(req.method === "POST" && req.path === "/api/blog/delete") {
        return {
            msg: "这是删除博客的接口"
        }
    }
}

module.exports = handleBlogRouter