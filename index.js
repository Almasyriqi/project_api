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
                res.status(200).send([{
                    success: true,
                    message: 'Project List',
                    data: result
                }])
            } else {
                res.status(404).send([{
                    success: false,
                    message: 'Item project not found!'
                }])
            }
        } else {
            res.status(500).send([{
                success: false,
                message: 'Internal Server Error!'
            }])
        }
        
    })
})

app.post('/project', (req, res) => {

    const projectName = req.body.project_name;
    const projectDesc = req.body.project_desc;
    const projectType = req.body.project_type;

    db.query(`INSERT INTO project (project_name, project_desc, project_type) 
    VALUES ('${projectName}', '${projectDesc}', '${projectType}')`, (err, result, fields) => {
        if(!err) {
            if(result.affectedRows) {
                res.status(200).send([{
                    success: true,
                    message: 'Success add project!'
                }])
            } else {
                res.status(400).send([{
                    success: false,
                    message: 'Submit project failed!'
                }])
            }
        } else {
            res.status(500).send([{
                success: false,
                message: 'Internal Server Error!'
            }])
        }
    })
})

app.delete('/project/:projectId', (req, res) => {
    const { projectId } = req.params

    db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (err, result, fields) => {
        if (result.length) {
            db.query(`DELETE FROM project WHERE project_id = ${projectId}`, (err, result, fields) => {
                if(result.affectedRows) {
                    res.status(200).send([{
                        success: true,
                        message: `Item project id ${projectId} has been deleted!`
                    }])
                } else {
                    res.status(404).send([{
                        success: false,
                        message: 'Item project failed to delete'
                    }])
                }
            })
        } else {
            res.status(404).send([{
                success: false,
                message: 'Data project not found!'
            }])
        }
    })
})

app.get('/project/:projectId', (req, res) => {
    const {projectId} = req.params

    db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (err, result, fields) => {
        if(!err) {
            if(result.length) {
                res.status(200).send([{
                    success: true,
                    message: `Project with id = ${projectId}`,
                    data: result
                }])
            } else {
                res.status(404).send([{
                    success: false,
                    message: 'Item project not found!'
                }])
            }
        } else {
            res.status(500).send([{
                success: false,
                message: 'Internal Server Error!'
            }])
        }
        
    })
})

app.listen(port, () => {
    console.log(`Listen app backend on port ${port}`)
})