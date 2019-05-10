const express = require('express')
const app = express()
const users = require('./routes/users')
const personaggi = require('./routes/personaggi')
let port = process.argv[2] || 8080

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://db_user:07Icius1!@cluster0-2sku7.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {

    if(err){
      console.log('Error\n', err);
    }
    console.log('Connected');

    //READ
    client.db("servernode").collection("personaggi").find().toArray(function (err, result){
      if (err) throw err
      console.log(result)
    }) 

    //INSERT
    client.db("servernode").collection('personaggi', function (err, collection){


      collection.insertOne({ name: 'Mario', lastname: 'Rossi'});

      client.db("servernode").collection('personaggi').countDocuments(function(err, count){

        if(err) throw err;
        console.log('Total rows: ' + count);
      });
    });

    //UPDATE
    client.db("servernode").collection('personaggi', function (err, collection){
      
      const newOne = {name: 'Pippo', lastname: 'Startk', vivo:false};
      collection.deleteOne({ id:ObjectId("5cd5499377ae010f2cf24b25")}, { $set: newOne},
    
      function(err, result){
        
        if(err) throw err;
        console.log('Documento aggiornato');
      });
    });

    //DELETE
    client.db("servernode").collection("personaggi").
    remove({ id:ObjectId("5cd5499377ae010f2cf24b25")}, { w:1 }, function(err, result) {

      if(err) throw err;
      console.log('Documento eliminato');
    });

  //CHIUDI
  client.close();
});


app.use(express.urlencoded({extended: false}))

const myLogger = (req, res, next) => {
  console.log('LOGGED');
  next();
};

app.use(myLogger);

app.use('/v0.1/users', users)
app.use('/v0.1/personaggi', personaggi)
app.use('/v0.2/personaggi', personaggi)
// app.use('/v0.2/admin/', personaggi)


app.use((req, res) => {
  res.status(404).send('what??? error 404')
});
app.listen(port)