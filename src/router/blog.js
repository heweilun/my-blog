const { 
    getList, 
    getDetail, 
    newBlog,
    updateBlog,
    deleteBlog
} = require("../controller/blog")
const { SuccessModel, ErrorModel } = require("../model/resModel")

const handleBlogRouter = (req, res) => {
    //博客的路由处理 查询 详情 新建 更新 删除

    if(req.method === "GET" && req.path === "/api/blog/list") {
        const { author, keyword } = req.query || {}
        const sqlData = getList(author || "", keyword || "")
        return sqlData.then(responseData => {
            return new SuccessModel(responseData)
        })
        // new ErrorModel(null,responseData)
    }

    if(req.method === "GET" && req.path === "/api/blog/detail") {
        const { id } = req.query || {}
        const responseData = getDetail(id || "")
        return new SuccessModel(responseData)
    }

    if(req.method === "POST" && req.path === "/api/blog/new") {
        const responseData = newBlog(req.body)
        return new SuccessModel(responseData)
    }

    if(req.method === "POST" && req.path === "/api/blog/update") {
        const responseData = updateBlog(req.body)
        if(responseData) {
            return new SuccessModel()
        }else {
            return new ErrorModel("更新失败")
        }
    }

    if(req.method === "POST" && req.path === "/api/blog/delete") {
        const responseData = deleteBlog(req.body)
        if(responseData) {
            return new SuccessModel()
        }else {
            return new ErrorModel("删除失败")
        }
    }
}

module.exports = handleBlogRouter