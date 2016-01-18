var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'zhuye' });

});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'zhuye' });

});




router.get('/reg', function(req, res, next) {
  res.render('reg', { title: 'zhuce' });

});

//reg
router.post('/reg',function(req, res){
  //检验用户输入两次口令
  console.log(req.body['password']);
  console.log(req.body['password-repeat']);
  if(res.body['password-repeat']!=req.body['password']){
    req.flash('error','口令不一致');
    return res.redirect('/reg');
  }
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  var newUser = new User({
    name : req.body.username,
    password : password
  })

  //检查用户是否存在
  User.get(newUser.name,function(err, user){
    if(user)
      err = 'Username already exists.';
    if(err){
      req.flash('error', err);
      return res.redirect('/reg');
    }
  })

  //如果不存在就创建新用户
  newUser.save(function(err){
    if(err){
      req.flash('error', err);
      return res.redirect('/reg');
    }

    req.session.user = newUser;
    req.flash('success','注册成功');
    res.redirect('/');
  })
})
router.get('/list',function(req, res){
  res.render('list',{title:'list'});
})
router.get('/user/:username',function(req, res){
  res.send('user:'+ req.params.username)
})

//login
router.post("/login",function(req,res) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');

  User.get(req.body.username, function(err, user) {
    if (!user) {
      req.flash('error', '用户不存在');
      return res.redirect('/login');
    }
           
    if (user.password != password) {
      req.flash('error', '用户名或密码错误');
      return res.redirect('/login');
    }
    req.session.user = user;
    req.flash('success', req.session.user.name + '登录成功');
    
    res.redirect('/');
  });
});
module.exports = router;
