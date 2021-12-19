const http = require("http")
const querystring = require("querystring")

const server = http.createServer((req, res)=>{
    if(req.method === "GET") {
        let params = querystring.parse(req.url.split("?")[1]);
        res.end(JSON.stringify(params))
    }else if(req.method === "POST") {
        res.end("post")
    }
})

server.listen(3000, ()=>{
    console.log('success')
})
