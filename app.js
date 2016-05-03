var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://localhost/winners', function(err, res) {
    if(err) {throw err;}
    console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//some public front-end
app.use(express.static(__dirname + '/public')); 

// Import Models and controllers
var models     = require('./models/winners')(app, mongoose);
var winnersCtrl = require('./controllers/winners');


var router = express.Router();
router.get('/', function(req, res) {
    res.send("Rock-Paper-Scissor Mainor Gamboa");
});
app.use(router);

var winnersRoutes = express.Router();

// API routes
winnersRoutes.route('/championship/top')
    .get(winnersCtrl.findTopOfWinners);


winnersRoutes.route('/championship/result')
    .post(winnersCtrl.addWinners);

winnersRoutes.route('/championship/new')
    .post(winnersCtrl.newChampionship);

winnersRoutes.route('/championship/deleteDB')
    .delete(winnersCtrl.deleteDataBase);


app.use('/api', winnersRoutes);

/***Server***/
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });