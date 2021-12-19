const http = require("http")
const querystring = require("querystring")

const server = http.createServer((req, res)=>{
    if(req.method === "GET") {
        let params = querystring.parse(req.url.split("?")[1]);
        res.end(JSON.stringify(params))
    }else if(req.method === "POST") {
        console.log("这是dev的修改第二次")
        res.end("post end")
    }
})

server.listen(8000, ()=>{
    console.log('success')
})