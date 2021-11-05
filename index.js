const { response } = require('express')
const express = require('express')
require('dotenv').config()
const db = require('./helper/db')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT

// Middleware
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (request, response) => {
    response.send('Backend Project Node Express')
})

app.get('/project', (req, res) => {
    db.query('SELECT * FROM project', (err, result, fields) => {
        if(!err) {
            if(result.length) {
                res.status(200).send({
                    success: true,
                    message: 'Project List',
                    data: result
                })
            } else {
                res.status(404).send({
                    success: false,
                    message: 'Item project not found!'
                })
            }
        } else {
            res.status(500).send({
                success: false,
                message: 'Internal Server Error!'
            })
        }
        
    })
})

app.post('/project', (req, res) => {

    const {projectName, projectDesc, projectType} = req.body

    db.query(`INSERT INTO project (project_name, project_desc, project_type) 
    VALUES ('${projectName}', '${projectDesc}', '${projectType}')`, (err, result, fields) => {
        if(!err) {
            if(result.affectedRows) {
                res.status(200).send({
                    success: true,
                    message: 'Success add project!'
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: 'Submit project failed!'
                })
            }
        } else {
            res.status(500).send({
                success: false,
                message: 'Internal Server Error!'
            })
        }
    })
})

app.listen(port, () => {
    console.log(`Listen app backend on port ${port}`)
})