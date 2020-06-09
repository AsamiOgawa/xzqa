const express = require('express')
const pool = require('../pool.js')

let router = express.Router()

// 查询指定用户的文章列表
router.get('/articlelist', (req, res) => {
  var obj = req.query
  var sql = 'select id as value,subject as label from xzqa_article where author_id=?'
  pool.query(sql, [obj.uid], (err, results) => {
    if (err) throw err
    res.send({ msg: '获取用户文章列表成功', code: 200, results })
  })
})

// 删除指定用户的已选择删除的文章
router.post('/removearticles', (req, res) => {
  var id = req.body.id
  var sql = 'delete from xzqa_article where id in (' + id + ')'
  pool.query(sql, (err, results) => {
    if (err) throw err
    res.send({ msg: '删除文章成功', code: 200 })
  })
})

// 修改用户个人信息(个人设置)
router.post('/profile', (req, res) => {
  var uid = req.body.id
  var nickName = req.body.name
  var password = req.body.password
  // 用户的密码通过数据库md5加密
  var sql = 'update xzqa_author set nickname=?, password=md5(?) where id=?'
  pool.query(sql, [nickName, password, uid], (err, results) => {
    if (err) throw err
    res.send({ msg: '修改用户信息成功', code: 200 })
  })
})

// 注册用户
router.post('/register', (req, res) => {
  var username = req.body.username
  var password = req.body.password
  // 查询是否存在已注册的用户名
  var sql = 'select count(*) as count from xzqa_author where username=?'
  pool.query(sql, [username], (err, results) => {
    if (err) throw err
    // 如果存在注册用户名
    if (results[0].count === 1) {
      res.send({ msg: '注册失败，已存在该用户名', code: 201 })
    }
    // 如果不存在发过来的用户名
    if (results[0].count === 0) {
      sql = 'insert into xzqa_author(username,password) values(?,?)'
      pool.query(sql, [username, password], (err, results) => {
        if (err) throw err
        res.send({ msg: '注册成功', code: 200 })
      })
    }
  })
})

// 用户登录
router.post('/login', (req, res) => {
  var username = req.body.username
  var password = req.body.password
  var sql = 'select id,username,nickname,article_number from xzqa_author where username=? and password=?'
  pool.query(sql, [username, password], (err, results) => {
    if (err) throw err
    if (!results.length) {
      res.send({ msg: '登录失败', code: 201 })
      return
    }
    res.send({ msg: '登录成功', code: 200, results })
  })
})
module.exports = router