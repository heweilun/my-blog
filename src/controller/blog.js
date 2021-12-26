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
    //返回模拟数据
    return {
        id: 1,
        title: "博客标题1",
        content: "这是博客内容详细信息",
        createTime: 154332666,
        author: "张三"
    }
}

const newBlog = (blogData = {}) => {
    //blogData是一个博客对象，包含title content熟悉
    return {
        id: 3,//表示新建博客，插入数据表内的id
    }
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