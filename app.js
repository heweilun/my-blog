
const querystring = require("querystring")
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const SESSION_DATA = {}//session 数据

//获取cookie过期时间
const getCookieExpires = () => {
    const control = new Date()
    control.setTime(control.getTime() + (24 * 60 * 60 * 1000))
    return control.toGMTString()
}

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

    //获取path
    const url = req.url//请求路径

    //解析query
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])

    //解析cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '' //key=value;key=value;
    cookieStr.split(';').forEach(item => {
        if(!item) {
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1].trim()
        req.cookie[key] = val
    })

    //解析 session
    //session为保证安全及cookie的条件所限使用的东西。前端理解：存储于后端的个人信息
    let needSetCookie = false//判断是否需要设置cookie
    let userId = req.cookie.userid
    if(userId) {//其实就是userId的保证，确保有userid，当前session没有就创建，有就直接赋值
        if(!SESSION_DATA[userId]) {
            SESSION_DATA[userId] = {}
        }
    } else {
        userId = `${Date.now()}_${Math.random()}`
        SESSION_DATA[userId] = {}
        needSetCookie = true
    }
    req.session = SESSION_DATA[userId]//对象索引赋值


    //处理post数据。原因：get参数是直接在url内可取
    //post请求所传的参数在请求体。node默认不解析请求体。解析请求体是一项耗时工作，需要需要时手动处理
    getPostData(req).then(postData => {
        req.body = postData

        // 为了保证所有路由获取post数据正常
        //blog路由处理
        // const blogData = handleBlogRouter(req, res)
        // if(blogData){
        //     res.end(JSON.stringify(blogData))
        //     return
        // }
        const blogResult = handleBlogRouter(req, res)
        if(blogResult) {
            blogResult.then(blogData => {//变成了promise
                if(blogData){
                    if(needSetCookie) {
                        //后端操作cookie
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)//httpOnly限制修改
                    }
                    res.end(JSON.stringify(blogData))
                }
            })
            return
        }

        //user路由处理
        // const userData = handleUserRouter(req, res)
        // if(userData){
        //     res.end(JSON.stringify(userData))
        //     return
        // }
        const userResult = handleUserRouter(req, res)
        if(userResult) {
            userResult.then(userData => {//变成了promise
                if(userData){
                    if(needSetCookie) {
                        //后端操作cookie
                        res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)//httpOnly限制修改
                    }
                    
                    res.end(JSON.stringify(userData))
                }
            })
            return
        }

         //未匹配上路由返回404 
        res.writeHead(404, {"Content-type": "text/plain"})//设置响应头，否则中文乱码
        res.write("404 Not Found\n")
        res.end()
    })
}

module.exports = serverHandle

