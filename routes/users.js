var express = require('express');
var router = express.Router();
var model = require('../model');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/** 注册接口 */
router.post('/regist',(req,res,next)=>{
  var data = {
    username: req.body.username,
    password: req.body.password,
    passwordAgain: req.body.passwordAgain
  }
  /** 数据校验 */
  model.connect((db)=>{
    db.collection('users').insertOne(data,(err,ret)=>{
      if(err) {
        console.log('注册失败');
        res.redirect('/regist');
      }else res.redirect('/login');
    })
  })
})

/** 数据登录 */
router.post('/login',(req,res,next)=>{
  var data = {
    username: req.body.username,
    password: req.body.password, 
  }
  /** 数据校验 */
  model.connect((db)=>{
    db.collection('users').find(data).toArray((err,docs)=>{
      if(err) res.redirect('/login ');
      else{
        if(docs.length>0) {
          /** 登录成功，进行session会话存储 */
          req.session.username = data.username;
          res.redirect('/');
        }
        else res.redirect('/login')
      }
    })
  })
})

module.exports = router;
