
const querystring = require("querystring")
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const serverHandle = (req, res)=>{
    //设置返回格式
    res.setHeader('Content-type', 'application/json')
    //不同模块功能分属不通目录
    const url = req.url//请求路径
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])

    //blog路由处理
    const blogData = handleBlogRouter(req, res)
    if(blogData){
        res.end(JSON.stringify(blogData))
        return
    }

    //user路由处理
    const userData = handleUserRouter(req, res)
    if(userData){
        res.end(JSON.stringify(userData))
        return
    }

    //未匹配上路由返回404 
    res.writeHead(404, {"Content-type": "text/plain"})//设置响应头，否则中文乱码
    res.write("404 Not Found\n")
    res.end()
}

module.exports = serverHandle

