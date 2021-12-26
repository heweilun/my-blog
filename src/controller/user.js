const loginCheck = (postData) => {
    const {username, password} = postData
    if(!username || !password){
        return false
    }else {
        return true
    }
}

module.exports = {
    loginCheck
}