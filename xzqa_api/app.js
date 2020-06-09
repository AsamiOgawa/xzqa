const express = require('express')
const pool = require('./pool.js')
const cors = require('cors')
const category = require('./router/category.js')
const me = require('./router/me.js')
const bodyParser = require('body-parser')

let app = express()

// 设置请求源
app.use(cors({
  options: ['http://localhost:8080/', 'http://127.0.0.1:8080/']
}))

// 设置静态资源路径
app.use(express.static('public'))

// 设置 body-parser 拦截器
app.use(bodyParser.urlencoded({
  extended: false
}))

// 文章分类相关路由
app.use('/', category)
// 个人中心路由
app.use('/', me)

app.listen(3000)