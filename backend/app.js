const express = require('express')
const fs = require('fs').promises;
path = require('path')
require('dotenv').config()


// initialize express
const app = express()

// set up json middle ware
app.use(express.json());

// serve up static file
app.use(express.static(path.join(__dirname, '..', 'frontend')))

// setting up error handler middleware
// app.use(async (req, res, next) => {
//     // creating new error object
//     const error = new Error('Not Found');
//     error.status = 404
//     next(error)
// });

// app.use((err, req, res, next) => {
//     res.status(err.status || 500);
//     res.send({
//         error: {
//             status: err.status || 500,
//             message: err.message,
//         },
//     });
// });


async function validate_token(token) {
    return process.env.SECRET === token;
}


// readJsonFile();

// setting up routes
app.get("/",  (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'frontend/index.html'));
});

app.get("/about",  (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'frontend/about.html'));
});

app.get("/contact",  (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'frontend/contact.html'));
});

app.get("/add-project",  (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'frontend/add_project.html'));
});

app.get("/project/:index", async (req, res, next) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'frontend/add_project.html'));
});

app.get("/projects",  async (req, res, next) => {
    try{
        const jsonData = await fs.readFile('./data/projects.json', 'utf8');
 
        const data = jsonData? JSON.parse(jsonData) : [];
        console.log(`projects loaded`);

        res.status(200).json({status: 200, success: true, data: data})

    } catch (error) {
        console.error(error)
        res.status(500).json({status: 500, success: false, error: 'Internal server error'})
    }
});

app.post("/project/add",  async (req, res, next) => {
    try{
        const {
            project_title,
            description,
            url,
            token
        } = req.body

        if (!project_title || !description || !url || !token) {
            res.status(400).json({status: 400, success: false, error: 'Invalid or incomplete data'})
        }

        const isValid = validate_token(token)

        if (!isValid) {
            return res.status(401).json({status: 401, success: false, error: 'You are not AUTHORISED to perform this action'})
        }

        const jsonData = await fs.readFile('./data/projects.json', 'utf8');

        const projects = jsonData? JSON.parse(jsonData) : [];
        
        const project = {
            project_title: project_title,
            description: description,
            url: url
        }

        projects.push(project)

        await fs.writeFile('./data/projects.json', JSON.stringify(projects, null, 2));
        console.log('New data written to file');

        return res.status(201).json({status: 200, success: true, message: 'New project created successfully'})

    } catch(error) {
        console.error(error)
        return res.status(500).json({status: 500, success: false, error: 'Internal server error'})
    }

});

app.get("/project/:index/get", async (req, res, next) => {
    try{
        const project_index = req.params.index

        const jsonData = await fs.readFile('./data/projects.json', 'utf8');
        const projects = JSON.parse(jsonData);
        
        const project = projects.find(project => project.id === project_index)

        if (!project) {
            res.status(404).json({status:404, success: false, error: 'Project not found'})
        }

        res.status(200).json({status: 200, success: true, data: project})

    } catch(error) {
        console.error(error)
        res.status(500).json({status: 500, success: false, error: 'Internal server error'})
    }
});


app.put("/project/:index/edit", async (req, res, next) => {
    try{
        const project_index = parseInt(req.params.index)
        const {
            project_title,
            description,
            url,
            token
        } = req.body

        if (!project_title || !description || !url || !token) {
            return res.status(400).json({status: 400, success: false, error: 'Invalid or incomplete data'})
        }

        const isValid = await validate_token(token)

        if (!isValid) {
            return res.status(401).json({status: 401, success: false, error: 'You are not AUTHORISED to perform this action'})
        }

        const jsonData = await fs.readFile('./data/projects.json', 'utf8');
        const projects = JSON.parse(jsonData);
        
        projects.forEach((p, i) => {
            if (project_index === i) {
                p.project_title = project_title
                p.description = description
                p.url = url
            }
        })

        await fs.writeFile('./data/projects.json', JSON.stringify(projects, null, 2));
        console.log(`Project ID: '${project_index}' updated`);

        res.status(200).json({status: 200, success: true, message: 'Project updated successfully'})

    } catch(error) {
        console.error(error)
        res.status(500).json({status: 500, success: false, error: 'Internal server error'})
    }
});

app.delete("/project/:index/delete", async (req, res, next) => {
    try{
        const { token } = req.body

        const project_index = req.params.index

        const isValid = await validate_token(token)

        if (!isValid) {
            return res.status(401).json({status: 401, success: false, error: 'You are not AUTHORISED to perform this action'})
        }

        const jsonData = await fs.readFile('./data/projects.json', 'utf8');
        const projects = JSON.parse(jsonData);

        projects.splice(project_index, 1)     

        await fs.writeFile('./data/projects.json', JSON.stringify(projects, null, 2));
        console.log(`Project ID: '${project_index}' deleted`);

        res.status(200).json({status: 200, success: true, message: 'Project deleted successfully'})

    } catch(error) {
        console.error(error)
        res.status(500).json({status: 500, success: false, error: 'Internal server error'})
    }
});

// declaring the port
const port = process.env.PORT || 3300;

// run server on port
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});'Secret is not valid'