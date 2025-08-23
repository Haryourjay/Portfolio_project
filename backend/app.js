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


async function readJsonFile() {
    try {
        const jsonData = await fs.readFile('./data/projects.json', 'utf8');
        const data = JSON.parse(jsonData);
        console.log(data);
        return data
    } catch (error) {
        console.error('Error reading JSON file:', error);
    }
}

async function writeJsonFile(data) {
    try {
        dataString = JSON.stringify([data])
        await fs.writeFile('./data/projects.json', dataString);
        console.log('Data successfully written to file');
    } catch (error) {
        console.error('Error writing JSON file:', error);
    }
}

async function updateDeleteJsonFile(id, method, newData) {
    try {
        const jsonData = await fs.readFile('./path/to/your/file.json', 'utf8');
        const projects = JSON.parse(jsonData);
        let projectIndex;

        if (method.toLower() === 'put') {
            data.forEach((project, index) => {
                if (project.id === id) {

                }
            });
        }
        console.log('Data successfully written to file');
    } catch (error) {
        console.error('Error writing JSON file:', error);
    }
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

app.get("/projects",  async (req, res, next) => {
    try{
        const jsonData = await fs.readFile('./data/projects.json', 'utf8');
 
        const data = jsonData? JSON.parse(jsonData) : [];
        console.log(data);

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
            url
        } = req.body

        if (!project_title || !description || !url) {
            res.status(400).json({status: 400, success: false, error: 'Invalid or incomplete data'})
        }

        const jsonData = await fs.readFile('./data/projects.json', 'utf8');

        const projects = JSON.parse(jsonData) || [];
        
        length = projects.length + 1

        project = {
            id: length,
            project_title: project_title,
            description: description,
            url: url
        }

        projects.append(project)

        await fs.writeFile('./data/projects.json', JSON.stringify(projects, null, 2));
        console.log('New data written to file');

        res.status(201).json({status: 200, success: true, message: 'New project created successfully'})

    } catch(error) {
        console.error(error)
        res.status(500).json({status: 500, success: false, error: 'Internal server error'})
    }

});

app.put("/project/edit", async (req, res, next) => {
    try{
        const {
            id,
            project_title,
            description,
            url
        } = req.body

        if (!id || !project_title || !description || !url) {
            res.status(400).json({status: 400, success: false, error: 'Invalid or incomplete data'})
        }

        const jsonData = await fs.readFile('./data/projects.json', 'utf8');
        const projects = JSON.parse(jsonData);
        
        projects.forEach(project => {
            if (project.id === id) {
                project.project_title = project_title
                project.description = description
                project.url = url
            }
        })

        await fs.writeFile('./data/projects.json', JSON.stringify(projects, null, 2));
        console.log(`Project ID: '${id}' updated`);

        res.status(200).json({status: 200, success: true, message: 'Project updated successfully'})

    } catch(error) {
        console.error(error)
        res.status(500).json({status: 500, success: false, error: 'Internal server error'})
    }
});

app.delete("/project/delete", async (req, res, next) => {
    try{
        const {
            id
        } = req.body

        if (!id) {
            res.status(400).json({status: 400, success: false, error: "Project 'id' is required"})
        }

        const jsonData = await fs.readFile('./data/projects.json', 'utf8');
        const projects = JSON.parse(jsonData);
        
        let project_index;

        projects.forEach((project, index) => {
            if (project.id === id) {
                project_index = index
            }
        });

        projects.pop(project_index)

        // change the id so that each id remains unique
        projects.forEach((project, index) => {
            project.id = index + 1
        });        

        await fs.writeFile('./data/projects.json', JSON.stringify(projects, null, 2));
        console.log(`Project ID: '${id}' deleted`);

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
});