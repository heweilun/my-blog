const getList = (author, keyword) => {
    // 先返回模拟数据
    return [
        {
            id: 1,
            title: "博客标题1",
            content: "博客内容1",
            createTime: 15412355411,
            author: "张三"
        },
        {
            id: 2,
            title: "博客标题2",
            content: "博客内容2",
            createTime: 15412355411,
            author: "李四"
        },
        {
            id: 3,
            title: "博客标题3",
            content: "博客内容3",
            createTime: 1542629552,
            author: "王五"
        },
    ]
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

module.exports =  {
    getList,
    getDetail,
    newBlog,
    updateBlog
}