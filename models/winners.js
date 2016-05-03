var mongoose = require('mongoose'),  
    Schema   = mongoose.Schema;

var winnersSchema = new Schema({  
  Name:{ type: String },
  Score:{ type: Number }
});

module.exports = mongoose.model('winners', winnersSchema);  