var express = require('express');
var router = express.Router();
var userController = require("../controllers/user");
var ideaController = require("../controllers/idea");
var renderController = require("../controllers/render");

var authenticate = function(req,res,next)
{
  if (req.session.loggedin)
    next();
  else
    res.redirect('/login');
}

router.get('/',authenticate,renderController.dashboard);

router.get('/profile',authenticate,renderController.profile);

router.get('/signup',function(req,res,next)
{
  res.render('signup');
});

router.post('/signup',userController.signup);

router.get('/login',function(req,res)
{
  res.render('index');
});

router.post('/login',userController.login);

router.get('/new',authenticate,function(req,res)
{
  res.render('new');
});

router.post('/new',authenticate,ideaController.new);

router.get('/pool',authenticate,renderController.pool);

router.get('/poolURL',authenticate,ideaController.pool);

/*router.get('/test',function(req,res){
  req.conn.query("SELECT posted_on FROM ideas where title = ?",['openprojects'],function(err,results){
    if(err)
    {
      consol.log(err);
      res.end();
    }
    console.log(results[0].posted_on.getDate());
  })
});

router.post('/test',function(req,res){
  console.log(req.body);
  res.end();
})*/


module.exports = router;
