var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/shoppingBasket');

var db = mongoose.connection;

db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('connected.');
});

var Schema = mongoose.Schema;
var userSchema = new Schema({
  title : String,
  desc : String,
  price : Number,
  isAlive : Boolean
});

var Item = mongoose.model('Item', userSchema);

var bible = new Item({
  title : 'Bible',
  desc : 'The word of God',
  price : 0,
  isAlive : true
});

bible.save(function (err, data) {
if (err) console.log(err);
else console.log('Saved : ', data );
});
