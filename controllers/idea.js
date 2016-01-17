//file for idea related controls

module.exports.new = function(req,res){

  var toInsert = {
     title : req.body.title,
     //idea_id : 1 ,
     shortd :req.body.shortd,
     longd : req.body.longd ,
     pl_web : (req.body.pl_web ? true : false) ,
     pl_win : (req.body.pl_win ? true : false) ,
     pl_android : (req.body.pl_android ? true : false),
     pl_ios : (req.body.pl_ios ? true : false),
     pl_fos : (req.body.pl_fos ? true : false) ,
     timespan : req.body.timespan ,
     facets : req.body.facets.join() ,
     target : req.body.target ,
     funding : req.body.funding ,
     competition : req.body.competition ,
     resources : req.body.resources ,
     owner_id : req.session.user_id ,
     posted_on : new Date()
  };
  //console.log(req.body);
  req.conn.query("INSERT into ideas SET ?",toInsert,function(err,result){
    if(err)
    {
      console.log(err);
      res.status(500).render('error',{message : err.code , stack : err.stack});
    }
    else {
      console.log('idea inserted');
      res.end();
    }
  });
}

module.exports.pool = function(req,res) //TODO to be ajaxed to get the required projects skill to be sent
{
  var skill = req.query.skillName ;
  req.conn.query("SELECT title , shortd , longd FROM ideas WHERE idea_id IN (SELECT idea_id FROM ideaskills WHERE skill_id = (SELECT skill_id FROM skills where skill = ?))",[skill],function(err,results){
    if(err)
    {
      console.log(err);
      res.status(500).send("server error");
    }
    else {
      res.json(results);
    }
  });
}
