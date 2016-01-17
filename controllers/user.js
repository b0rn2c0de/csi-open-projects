//contains user specific controls
//TODO add username and emal uniquness validations

var bcrypt = require('bcrypt-nodejs');

module.exports.signup = function(req,res,next)
        {
        var onInsert = function(err,result)
        {
        if(err)
        {
          if(err.code == 'ER_DUP_ENTRY')
          {
            //TODO handle duplicate entry redirection
          }
          else {
            console.log(err)
            res.status(500).end();
          }
        }
        else {
            console.log("user inserted")
            res.end();
         }
        }
        bcrypt.hash(req.body.password,bcrypt.genSaltSync(),null,function(err,hash)
        {
        if(err)
        console.log(err);
        else
        {
          var toInsert = {
            Firstname : req.body.Firstname,
            Lastname : req.body.Lastname ,
            email : req.body.email,
            password : hash,
            username :  req.body.username ,
            Github : req.body.Github ,
            LinkedIn : req.body.LinkedIn
          }
          console.log(toInsert);
          req.conn.query("INSERT INTO users SET ?",toInsert,onInsert);
          }
         });
        }

module.exports.login = function(req,res)
{
  var name = req.body.username ;
  var password = req.body.password ;
  req.conn.query('SELECT `user_id` , `password`, `Firstname` , `Lastname` FROM users WHERE username = ?',[name],function(err,results)
 {
   if(err)
   {
     console.log(err + err.stack)
     res.status(500).end();
   }
  else if(results.length == 0 )
  {
    console.log("user not found");
    res.send("not found");
  }
  else {
  //  var storedPassword = results[0].password ;
  //   if(bcrypt.compareSync(password,storedPassword))
  //    {
        req.session.loggedin = true ;
        req.session.userId = results[0].user_id ;
        req.session.Fname = results[0].Firstname ;
        req.session.Lname = results[0].Lastname ;
        res.send("loggedin"); //TODO proper redirection to dashboard
  //    }
  //  else
  //  {
  //    console.log("wrong password");
  //    res.send("password");
  //  }
   }
 });
}
