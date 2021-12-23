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

module.exports =  {
    getList
}