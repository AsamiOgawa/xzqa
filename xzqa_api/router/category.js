const express = require('express')
const bodyParser = require('body-parser')
const pool = require('../pool.js')

var router = express.Router()

// 文章分类信息接口
router.get('/category', (req, res) => {
  var sql = 'select * from xzqa_category'
  pool.query(sql, (err, results) => {
    if (err) throw err
    res.send({ msg: '获取文章分类表成功', code: 200, results })
  })
})

// 每个分类下的文章列表接口
router.get('/list/:cid/:pagenum', (req, res) => {
  var obj = req.params
  var pagesize = 10
  var offset = (obj.pagenum - 1) * pagesize
  var pageCount

  // 查询指定分类下的总页数
  var sql1 = 'select count(id) count from xzqa_article where category_id = ?'
  pool.query(sql1, [obj.cid], (err, results) => {
    if (err) throw err;
    pageCount = Math.ceil(results[0].count / pagesize)
  })

  // 查询指定分类下的文章，每页10条
  var sql2 = 'select id,subject,image,description from xzqa_article where category_id = ? limit ?,?'
  pool.query(sql2, [obj.cid, offset, pagesize], (err, results) => {
    if (err) throw err;
    res.send({ msg: '获取文章列表成功', code: 200, results, pageCount: pageCount })
  })
})

// 查询指定文章的相关信息（包括作者信息）
router.get('/article/:id', (req, res) => {
  var obj = req.params
  var sql = 'select a.id,subject,content,created_at,nickname,avator,article_number ' +
    ' from xzqa_article as a inner join xzqa_author as b ' +
    ' on author_id = b.id where a.id = ?'
  pool.query(sql, [obj.id], (err, results) => {
    if (err) throw err
    res.send({ msg: '获取文章信息成功', code: 200, results })
  })
})

module.exports = router