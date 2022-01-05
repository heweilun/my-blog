const redis = require('redis') 
const { REDIS_CONF } = require('../config/db')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host, REDIS_CONF.password)

redisClient.on('error', err => {
    console.error(err)
})

function redisSet(key, val){
    if(typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

function redisGet(key) {
    const promise = new Promise((resolve, reject)=>{
        redisClient.get(key, (err, val) => {
            if(err) {
                reject()
                return
            }
            if(val === null) {
                resolve(null)
                return
            }
            try {
                resolve(
                    JSON.parse(val)
                )
            } catch (ex) {
                resolve(val)
            }
        })
    })
    return promise
}

module.exports = {
    redisSet,
    redisGet
}