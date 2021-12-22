
const querystring = require("querystring")

const serverHandle = (req, res)=>{
    //设置返回格式
    res.setHeader('Content-type', 'application/json')
    const method = req.method//请求方式
    const url = req.url//请求路径
    const path = url.split('?')[0]
    const query = querystring.parse(url.split('?')[1])//请求参数
    // process.env.NODE_ENV cross-env安装后可获取
    const resData = {
        method,
        url,
        path,
        query
    }
    if(method === "GET") {
        res.end(JSON.stringify(resData))
    }else if(method === "POST") {
        let postData = ""
        req.on('data', chunk => {//发送数据
            postData += chunk.toString()
        })
        req.on('end', () => {//数据发送完成
            resData.postData = postData
            res.end(JSON.stringify(resData))
        })
    }
}

module.exports = serverHandle

