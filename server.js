//REQUIRE DEPENDECIES
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8004
require('dotenv').config()
 
//DECLARED DB VARIABLES
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'star-trek-api'

//CONNECT TO MONGO
MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

    //SET MIDDLEWARE
    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.get('/',(request, response)=>{
        db.collection('alien-info').find().toArray()
        .then(data => {
            let nameList = data.map(a => a.name)
            console.log(nameList)
            response.render('index.ejs', { info: nameList })
        })
        .catch(error => console.error(error))
    })

    app.post('/api',(request,response)=>{
        console.log('post heard')
        db.collection('alien-info').insertOne(
            request.body
        )
            .then(result=>{
                console.log(result)
                response.redirect('/ ')
            })

    })

    app.put('/updateEntry',(request,response)=>{
        console.log(request.body)
        Object.keys(request.body).forEach(key => {
            if (request.body[key] === null || request.body[key] === undefined || request.body[key] === '') {
              delete request.body[key];
            }
        })
        console.log(request.body)
        db.collection('alien-info').findOneAndUpdate(
            {name:request.body.name},
            {
                $set: request.body
            }
        )
        .then(result => {
            console.log(result)
            response.json('Success')
        })
        .catch(error => console.error(error))
    })

    app.delete('/deleteEntry',(request,response)=>{
        db.collection('alien-info').deleteOne(
            {name: request.body.name}
        )
            .then(result => {
                console.log('Entry deleted')
                response.json('Entry deleteddd')
            })
            .catch(error => console.error(error))
    })

//SET UP LOCAL HOST ON PORT
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
