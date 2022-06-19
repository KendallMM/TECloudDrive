const mongoose = require('mongoose');

const user = "NewUser";
const password = "TEC135";
const dbname = "Proyecto3"

const URI = `mongodb+srv://${user}:${password}@cluster0.n3lpa.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(URI)
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;

