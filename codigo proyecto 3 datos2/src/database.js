const mongoose = require('mongoose');

const user = "Manejador_codigo";
const password = "oeDnZXIYmQevbOAO";
const dbname = "Proyecto3"

const URI = `mongodb+srv://${user}:${password}@cluster0.swfljtx.mongodb.net/${dbname}?retryWrites=true&w=majority`;
mongoose.connect(URI)
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;

