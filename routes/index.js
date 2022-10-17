var express = require('express');
var router = express.Router();
var model = require('../model/index')

/* GET home page. */
router.get('/', function(req, res, next) {
  model.connect((db)=>{
    db.collection('users').find().toArray((err,docs)=>{
      console.log('用户列表',docs);
      res.render('index', { title: 'Express' });
    })
  })
});

/** 渲染注册页 */ 
router.get('/regist',(req,res,next)=>{
  res.render('regist',{});
})

/** 渲染登录页 */ 
router.get('/login',(req,res,next)=>{
  res.render('login',{});
})

module.exports = router;
