const fs = require('fs')
const path = require('path')
const readline = require('readline')

const fullFileName = path.join(__dirname, '../', '../', 'logs', 'access.log')
// 创建 read stream
const readStream = fs.createReadStream(fullFileName)

//创建readline对象
const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0
let total = 0

//逐行读取
rl.on('line', (lineData)=>{
    if(!lineData) {
        return
    }
    //记录总行数
    total ++
    const lineArr = lineData.split('--')
    if(lineArr[2] && lineArr[2].indexOf('Chrome') > 0){
        chromeNum ++
    }
})

rl.on('close', ()=>{
    console.log('chrome 占比：'+ chromeNum / total)
})