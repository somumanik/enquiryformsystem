let express = require('express');
let cors = require('cors');
const { dbConnection } = require('./App/congig/dbConnection');
const { ObjectId } = require('mongodb');
let app = express();


app.use(cors())
app.use(express.json());

// save krne ki API hamesha post naam se banegi
app.post('/enquiryform/save', async (req, res) => {
    console.log(req.body)
    let { name, email, phone } = req.body // destructure

    let db = await dbConnection()
    let enquiryTable = await db.createCollection('enquiry')

    //  ab yaha pr hum uper diye hue req.body mein destructure ko call karenge

    let insertObj =
    {
        name,
        email,
        phone
    }

    // ab yaha pr hum insert query likhenge
    let insertRes = await enquiryTable.insertOne(insertObj)



    let obj = {
        status: 1,
        msg: "Data Saved",
        insertRes

    }

    res.send(obj)
})


// data ko frontend mein dikhane ke liye API hamesha get naam se banegi

app.get('/enquiryform/view', async (req, res) => {
    // yeh do line  ke code same rahenge post aur get wale Method mein
    let db = await dbConnection()
    let enquiryTable = await db.createCollection('enquiry')

    // yeh neeche ek line wali code se API ban jayegi
    let data = await enquiryTable.find().toArray()

    // ab obj banaeynge
    let obj = {
        status: 1,
        data
    }

    res.send(obj)

    // yaa to uper wali se call kro yaa neeche wali se call kro

    // res.status(200).json(obj)
})

app.delete('/enquiryform/delete/:id', async (req, res) => {
    let { id } = req.params

    let db = await dbConnection()
    let enquiryTable = await db.createCollection('enquiry')

    let deletRes = await enquiryTable.deleteOne({ _id: new ObjectId(id) })

    let obj ={
        status: 1,
        msg: " Data Deleted",
        deletRes
    }
    // res.send(obj)
    res.status(200).json(obj)
})


app.listen("8000", () => {
    console.log("Server is running on port 8000");
});