const express = require('express')
const { ObjectId } = require('mongodb')
const { connectToDb, getDb } = require('./db')
const cors = require('cors')

// init app & middleware
const app = express()

// parse any json incoming request to be used in post handler function
app.use(express.json())

// cors
app.use(cors())


// db connection
let db
connectToDb((err) =>{
   if (!err){
      app.listen(3000, () => {
         console.log('listening on port 3000')
      })
      db = getDb()
   }
})

// list of novels
app.get('/novels', (req,res) => {
   let novels = []

   db.collection('novel')
      .find()
      .forEach(novel => novels.push(novel))
      .then(() => {
         res.status(200).json(novels)
      })
      .catch(() => {
         res.status(500).json({error: 'Could not fetch the documents'})
      })
})

// particular novel
app.get('/novels/:id', (req,res) => {
   db.collection('novel')
      .findOne({_id: ObjectId(req.params.id)})
      .then(doc => {
         res.status(200).json(doc)
      })
      .catch(err => {
         res.status(500).json({error: 'Could not fetch particular documents'})
      })
})

// list of manga/manwha/webtoon
app.get('/mmws', (req,res) => {
   let mmws = []

   db.collection('mmw')
      .find()
      .forEach(mmw => mmws.push(mmw))
      .then(() => {
         res.status(200).json(mmws)
      })
      .catch(() => {
         res.status(500).json({error: 'Could not fetch the documents'})
      })
})

// particular mmw
app.get('/mmws/:id', (req,res) => {
   db.collection('mmw')
      .findOne({_id: ObjectId(req.params.id)})
      .then(doc => {
         res.status(200).json(doc)
      })
      .catch(err => {
         res.status(500).json({error: 'Could not fetch particular documents'})
      })
})

// add a new list
app.post('/novel', (req,res) => {
   const list = req.body

   db.collection('novel')
      .insertOne(list)
      .then(result => {
         res.status(201).json(result)
      })
      .catch( err => {
         res.status(500).json({err: 'Could not create new document'})
      })
})

app.post('/mmw', (req,res) => {
   const list = req.body

   db.collection('mmw')
      .insertOne(list)
      .then(result => {
         res.status(201).json(result)
      })
      .catch( err => {
         res.status(500).json({err: 'Could not create new document'})
      })
})

// update a certain part of novel
app.patch('/novel/:id', (req,res) => {
   const update = req.body
   // verify objectid
   if (ObjectId.isValid(req.params.id)){
      db.collection('novel')
         .updateOne({_id: ObjectId(req.params.id)}, {$set: update})
         .then(result => {
            res.status(200).json(result)
         })
         .catch(err => {
            res.status(500).json({error: 'Could not update the document'})
         })
   } else {
      res.status(500).json({error: 'Not a valid doc id'})
   }
})

// update a certain part of mmw
app.patch('/mmw/:id', (req,res) => {
   const update = req.body
   // verify objectid
   if (ObjectId.isValid(req.params.id)){
      db.collection('mmw')
         .updateOne({_id: ObjectId(req.params.id)}, {$set: update})
         .then(result => {
            res.status(200).json(result)
         })
         .catch(err => {
            res.status(500).json({error: 'Could not update the document'})
         })
   } else {
      res.status(500).json({error: 'Not a valid doc id'})
   }
})