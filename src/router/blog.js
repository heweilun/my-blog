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
        const sqlData = getDetail(id || null)
        return sqlData.then(responseData => {
            if(responseData[0]) {
                return new SuccessModel(idresponseData[0])//select返回的数据都是数组类型
            }else {
                return new ErrorModel(null)
            }
        })
    }

    if(req.method === "POST" && req.path === "/api/blog/new") {
        const sqlData = newBlog(req.body)
        return sqlData.then(responseData => {
            if(responseData) {
                return new SuccessModel({id: responseData.insertId})//返回新建的数据id
            }else {
                return new ErrorModel(null)
            }
        })
    }

    if(req.method === "POST" && req.path === "/api/blog/update") {
        const sqlData = updateBlog(req.body)
        return sqlData.then(updateData => {
            if(updateData.affectedRows > 0) {//mysql返回的上次操作受影响数
                return new SuccessModel()
            }else {
                return new ErrorModel(null)
            }
        })
    }

    if(req.method === "POST" && req.path === "/api/blog/delete") {
        const sqlData = deleteBlog(req.body)
        return sqlData.then(updateData => {
            if(updateData.affectedRows > 0) {//mysql返回的上次操作受影响数
                return new SuccessModel()
            }else {
                return new ErrorModel(null)
            }
        })
    }
}

module.exports = handleBlogRouter