var mongoose = require('mongoose');
var Winners  = mongoose.model('winners');


//GET - Returns a specific number of winners in score order
exports.findTopOfWinners = function(req, res) {
	Winners.find(function(err, winners) {
    if(err) res.send(500, err.message);
        
    var WinnerFormat=[];
    winners.forEach(function(entry) {
        WinnerFormat.push(entry.Name);
    });
    res.status(200).jsonp({players: WinnerFormat});
        
	}).sort({Score:-1}).select({ Name: 1, _id: 0 }).limit(Number(req.query.count));
};

//Store one player in data bae with the score
function addChamp (name,num) {
  var status = {msj:'success',code:200};
  Winners.findOne({ 'Name': name },'Score', function (err, winner) {
            if (err) return handleError(err);
              if(winner!==null) {
                    winner.Score  +=num;
                    winner.save(function(err) {
                        if(err) {
                            status.msj =err.message;
                            status.code =500;
                        }
                    });
                }
                else {
                    var winner = new Winners({
                        Name:    name,
                        Score: 	  num
                    });
                    
                    winner.save(function(err, winner) {
                        if(err) {
                            status.msj =err.message;
                            status.code =500;
                        }
                    })
                }
        })
    return status;
}


//POST - Add One Winner in a Database
exports.addWinners = function(req, res) {
    
    var statusF=addChamp(req.body.first,3);
    var statusS=addChamp(req.body.second,1);
    
    if(statusF.code===500 ){
        res.status(500).jsonp({Status:statusF.msj});
    }
    else if(statusS.code===500 ){
        res.status(500).jsonp({Status:statusS.msj});
    }
    res.status(200).jsonp({Status:'Sucess'});
};


var msj="";
//POST - Exec one championship and store first and second
exports.newChampionship = function(req, res) {
    try{
        var data = eval ("(" + req.body.data + ")");
      }
    catch(err)
    {
        return res.status(500).jsonp({Status:'Error in the structure'});
        
    }
    if(data.length !==2 )
    {
        res.status(500).jsonp({Status:'Error in the structure does not meet 2 to the n'});
    }
    
    var validations =validate(data[0],data[1]);
    if(!validations){
        return res.status(500).jsonp({Status:msj});
    }
    else{
        var championshipsWinners=championship(data[0],data[1]);

        var statusF=addChamp(championshipsWinners[0][0],3);
        var statusS=addChamp(championshipsWinners[1][0],1);

        if(statusF.code===500 ){
            return res.status(500).jsonp({Status:statusF.msj});
        }
        else if(statusS.code===500 ){
            return res.status(500).jsonp({Status:statusS.msj});
        }
        res.status(200).jsonp({winner: championshipsWinners[0]});
    }
};
//DELETE reset the database
exports.deleteDataBase = function(req, res) {
    Winners.remove({}, function(err) { 
    res.status(200).jsonp({status: 'Database Reset'});
});
};

//Determinate the winner in one match
function winner(game1,game2)
{
  var winner;
  var secondPlace;
  if(game1[1]==="S" && game2[1]==="S")
  {
    winner= game1;
    secondPlace = game2;
  }
  if(game1[1]==="S" && game2[1]==="R")
  {
    winner= game2;
    secondPlace = game1;
  }
  if(game1[1]==="S" && game2[1]==="P")
  {
    winner= game1;
    secondPlace = game2;
  }
  if(game1[1]==="R" && game2[1]==="R")
  {
    winner= game1;
    secondPlace = game2;
  }
  if(game1[1]==="R" && game2[1]==="S")
  {
    winner= game1;
    secondPlace = game2;
  }
  if(game1[1]==="R" && game2[1]==="P")
  {
    winner= game2;
    secondPlace = game1;
  }
  if(game1[1]==="P" && game2[1]==="P")
  {
    winner= game1;
    secondPlace = game2;
  }
  if(game1[1]==="P" && game2[1]==="S")
  {
    winner= game2;
    secondPlace = game1;
  }
  if(game1[1]==="P" && game2[1]==="R")
  {
    winner= game1;
    secondPlace = game2;
  }
  
  return [winner,secondPlace];
}

//Determinate the winners in one championship
function championship(game1,game2)
{
  if(!Array.isArray(game1[0]))
  {
    return winner(game1,game2);
  }
  else
      return winner(championship(game1[0],game1[1])[0],championship(game2[0],game2[1])[0]);
}


//validate the structure of the championship
function validate(game1,game2)
{
  if(game1.length!==2 || game2.length!==2)
  {
     msj="Error in the structure does not meet 2 to the n";
     return false;
  }
  if(!Array.isArray(game1[0]) && !Array.isArray(game2[0]))
  {
    return validityRPS(game1,game2);
  }
  
  else{
    
      return validate(game1[0],game1[1]) && validate(game2[0],game2[1]);
  }
}

//validate the strategys of the one match are correct
function validityRPS(game1,game2)
{
    if((game1[1] ==='R' || game1[1]==='S' || game1[1]==='P' )
      && (game2[1]==='R' ||game2[1]==='S' || game2[1]==='P'))
    {
       
        return true;
    }
    msj="Incorrect strategy was found not belong to R P S";
    return false;
}

