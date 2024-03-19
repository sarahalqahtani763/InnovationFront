const express = require('express')
const app = express()
const fs = require('fs')
const uuid = require('uuid')


//get methode
app.get('/university',(req,res)=> {
    try{
        const uni = fs.readFileSync('./University.json', 'utf8')
       // res.json({"success": true})
       res.status(200).json(JSON.parse(uni))

    }catch{
        res.status(500).json({error:err})
    }

}) 

//get method
app.get('/university/:id',(req,res)=> {
    try{
        const uni = fs.readFileSync('./University.json', 'utf8')
        const col = JSON.parse(uni)[req.params.id]
       res.status(200).json(col)

    }catch{
        res.status(500).json({error:err})
    }

}) 

function writeFile(data){
    fs.writeFileSync('./University.json', JSON.stringify(data), 'utf8')
}

//post method [handling a POST request to create a new university entry]
app.post('/university', (req, res) => {
    const data = req.body
    let university = readFile()
    const id = uuid.v4()
    if (university[id]) {
        return res.json({'message':`University id ${id} is already exists`});
    }
    data['university_id'] = id
    university[id] = data
    writeFile(university)

    res.status(201).json({'university':university[id]})
})

app.put('/university/:id', (req, res) => {
    const data = req.body
    const id = req.params.id
    let university = readFile()

    if (!university[id]) return res.status(404).json({'message':'not found'});

    data['university_id'] = id

    university[id] = data

    writeFile(university)

    res.status(200).json({'university':university[id]})
})
app.listen(3000, console.log('listening on port 3000'))