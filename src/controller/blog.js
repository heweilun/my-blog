//引入数据库操作
const { exec } = require('../db/mysql')

const getList = (author, keyword) => {
    let sql = `select id, title, content, createtime, author from blogs where 1=1 `//1=1占位保证where的正确
    if(author) {//有作者的查询
        sql += `and author='${author}' `
    }
    if(keyword) {//有keyword的查询
        sql += `and title like '%${keyword}%' `
    }
    sql += `order by createtime desc;`

    //返回prommise
    return exec(sql)
}

const getDetail = (id) => {
    let sql = `select * from blogs where id='${id}'`
    //返回promise
    return exec(sql)
}

const newBlog = (blogData = {}) => {
    //blogData是一个博客对象，包含title content author熟悉
    const { title, content, createtime=Date.now(), author } = blogData
    let sql = `insert into blogs (title, content, createtime, author) 
    values ('${title}', '${content}', ${createtime}, '${author}')`
    return exec(sql)
}

const updateBlog = (blogData = {}) => {
    //有id返回true 无返回false
    if(blogData.id) {
        return true
    }else {
        return false
    }
    
}

const deleteBlog = (blogData = {}) => {
    //有id返回true 无返回false
    if(blogData.id) {
        return true
    }else {
        return false
    }
    
}

module.exports =  {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    deleteBlog
}