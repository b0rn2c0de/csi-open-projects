// controller to fetch data before displaying pages


module.exports.dashboard = function(req,res)
{
  var data = {};
  req.conn.beginTransaction(function(err) {
    if (err){
      return req.conn.rollback(function() {
        console.log("transaction error");
        res.status(500).send("server error");
      });
    }
    req.conn.query("SELECT `Firstname` , `Lastname` FROM `users` where `user_id = ?`",[req.session.userId],function(err,results){
      if (err){
        return req.conn.rollback(function() {
          console.log(err);
          res.status(500).send("server error");
        });
       }
      data['Fname'] = results[0].Firstname ; data['Lname'] = results[0].Lastname;
      req.conn.query("SELECT `posted_on` FROM `ideas` WHERE owner_id = ?",[req.session.userId],function(err,results){
        if (err){
          return req.conn.rollback(function() {
            console.log(err);
            res.status(500).send("server error");
          });
         }
         data['noIdeas'] = results.length ; data['today'] = 0 ;
         var today = new Date();
         for(var i = 0 ; i < results.length ; i++ )
         {
           if(results[i].posted_on.getDate() == today.getDate())
              data['today']++;
         }
         req.conn.commit(function(err){
           if(err)
           {
             console.log("commit error")
             res.status(500).send("server error");
           }
           else {
              res.render('dashboard',data);
           }
         });
      });
    });
  });
}

module.exports.profile = function(req,res)
{
  var data = {
    Fname : req.session.Fname ,
    Lname : req.session.Lname
  };
  req.conn.beginTransaction(function(err) {
    if (err){
      return req.conn.rollback(function() {
        console.log("transaction error");
        res.status(500).send("server error");
      });
    }
    req.conn.query("SELECT `Github` , `LinkedIn` FROM users WHERE `user_id` = ?",[req.session.userId],function(err,results){
      if (err){
        return req.conn.rollback(function() {
          console.log(err);
          res.status(500).send("server error");
        });
       }
       data['github'] = results[0].Github ; data['LinkedIn'] = results[0].LinkedIn ;
       req.conn.query("SELECT `title` , `status` FROM `ideas` WHERE `owner_id` = ?",[req.session.userId],function(err,results){
         if (err){
           return req.conn.rollback(function() {
             console.log(err);
             res.status(500).send("server error");
           });
          }
          data['ideas'] = results ;
          req.conn.query("SELECT s.skill FROM userskills AS u INNER JOIN skills AS s ON u.skill_id = s.skill_id WHERE u.user_id = ? ",[req.session.userId],function(err,results){
            if (err){
              return req.conn.rollback(function() {
                console.log(err);
                res.status(500).send("server error");
              });
             }
             data['skills'] = results;
             req.conn.commit(function(err){
               if(err)
               {
                 console.log("commit error")
                 res.status(500).send("server error");
               }
               else {
                  res.render('profile',data);
                  console.log(data);
               }
             });
          })
       });
    });
  });
}


module.exports.pool =  function(req,res)
{
  req.conn.query("SELECT skill_id , skill from skills",[],function(err,results){
    if(err)
    {
      console.log("transaction error");
      res.status(500).send("server error");
    }
    else {
       res.render('pool',{data : results});
    }
  })
}
