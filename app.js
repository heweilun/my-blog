
const querystring = require("querystring")
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (req) =>{
    const promise = new Promise((resolve, reject) => {
        if(req.method !== 'POST') {
            resolve({})
            return
        } 
        if(req.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk=>{
            postData += chunk.toString()
        })

        req.on('end', ()=>{
            if(!postData){
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
    return promise
}

const serverHandle = (req, res)=>{
    //设置返回格式
    res.setHeader('Content-type', 'application/json')
    //不同模块功能分属不通目录
    const url = req.url//请求路径
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])

    //处理post数据。原因：get参数是直接在url内可取
    //post请求所传的参数在请求体。node默认不解析请求体。解析请求体是一项耗时工作，需要需要时手动处理
    getPostData(req).then(postData => {
        req.body = postData

        // 为了保证所有路由获取post数据正常
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
    })
}

module.exports = serverHandle

