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


// const mailjetClient = mailjet.apiConnect(
//   process.env.MJ_APIKEY_PUBLIC,
//   process.env.MJ_APIKEY_PRIVATE
// );

// Or as fallback error handler
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.sendFile(path.join(__dirname, "frontend", "500.html"));
// });


// async function validate_token(token) {
//     return process.env.SECRET === token;
// }


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

app.get("/projects/:index", async (req, res, next) => {
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

app.post("/projects/add",  async (req, res, next) => {
    try{
        const {
            project_title,
            description,
            video_url,
            thumbnail_url
        } = req.body

        if (!project_title || !description || !video_url || !thumbnail_url) {
            res.status(400).json({status: 400, success: false, error: 'Invalid or incomplete data'})
        }

        // const isValid = validate_token(token)

        // if (!isValid) {
        //     return res.status(401).json({status: 401, success: false, error: 'You are not AUTHORISED to perform this action'})
        // }

        const jsonData = await fs.readFile('./data/projects.json', 'utf8');

        const projects = jsonData? JSON.parse(jsonData) : [];
        
        const project = {
            project_title,
            description,
            video_url,
            thumbnail_url
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

app.get("/projects/:index/get", async (req, res) => {   
    try{
        const project_index = parseInt(req.params.index)
        
        const jsonData = await fs.readFile('./data/projects.json', 'utf8');
        const projects = JSON.parse(jsonData);
        
        const project = projects.find((project, index) => index === project_index)

        if (!project) {
            return res.status(404).json({status:404, success: false, error: 'Project not found'})
        }

        return res.status(200).json({status: 200, success: true, data: project})

    } catch(error) {
        console.error(error)
        res.status(500).json({status: 500, success: false, error: 'Internal server error'})
    }
});

app.put("/projects/:index/edit", async (req, res, next) => {
    try{
        const project_index = parseInt(req.params.index)
        const {
            project_title,
            description,
            video_url,
            thumbnail_url
        } = req.body
        console.log({
            project_title,
            description,
            video_url,
            thumbnail_url
        })
        if (!project_title || !description || !video_url || !thumbnail_url) {
            return res.status(400).json({status: 400, success: false, error: 'Invalid or incomplete data ' + String(project_index)})
        }

        const jsonData = await fs.readFile('./data/projects.json', 'utf8');
        const projects = JSON.parse(jsonData);
        
        projects.forEach((p, i) => {
            if (project_index === i) {
                p.project_title = project_title
                p.description = description
                p.video_url = video_url
                p.thumbnail_url = thumbnail_url
            }
        })

        await fs.writeFile('./data/projects.json', JSON.stringify(projects, null, 2));
        console.log(`Project ID: '${project_index}' updated`);

        res.status(200).json({status: 200, success: true, message: 'Project updated successfully ' + String(project_index)})

    } catch(error) {
        console.error(error)
        res.status(500).json({status: 500, success: false, error: 'Internal server error'})
    }
});

app.delete("/projects/:index/delete", async (req, res, next) => {
    try{

        const project_index = req.params.index

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


app.get("/reviews",  async (req, res, next) => {
    try{
        const jsonData = await fs.readFile('./data/reviews.json', 'utf8');
 
        const data = jsonData? JSON.parse(jsonData) : [];
        console.log(`reviews loaded`);

        res.status(200).json({status: 200, success: true, data: data})

    } catch (error) {
        console.error(error)
        res.status(500).json({status: 500, success: false, error: 'Internal server error'})
    }
});

app.post("/reviews/add",  async (req, res, next) => {
    try{
        const {
            reviewer_name,
            reviewer_image_url,
            review
        } = req.body

        if (!reviewer_name || !reviewer_image_url || !review) {
            res.status(400).json({status: 400, success: false, error: 'Invalid or incomplete data'})
        }

        const jsonData = await fs.readFile('./data/reviews.json', 'utf8');

        const reviews = jsonData? JSON.parse(jsonData) : [];
        
        const newReview = {
            reviewer_name,
            reviewer_image_url,
            review
        }

        reviews.push(newReview)

        await fs.writeFile('./data/reviews.json', JSON.stringify(reviews, null, 2));
        console.log('New data written to file');

        return res.status(201).json({status: 200, success: true, message: 'New review created successfully'})

    } catch(error) {
        console.error(error)
        return res.status(500).json({status: 500, success: false, error: 'Internal server error'})
    }

});

app.get("/reviews/:index/get", async (req, res) => {
    try{
        const review_index = parseInt(req.params.index)
        console.log(review_index)
        const jsonData = await fs.readFile('./data/reviews.json', 'utf8');
        const reviews = JSON.parse(jsonData);
        
        const review = reviews.find((review, index) => index === review_index)

        if (!review) {
            return res.status(404).json({status:404, success: false, error: 'review not found'})
        }

        return res.status(200).json({status: 200, success: true, data: review})

    } catch(error) {
        console.error(error)
        res.status(500).json({status: 500, success: false, error: 'Internal server error'})
    }
});

app.put("/reviews/:index/edit", async (req, res, next) => {
    try{
        const review_index = parseInt(req.params.index)
        const {
            reviewer_name,
            reviewer_image_url,
            review
        } = req.body

        if (!reviewer_name || !reviewer_image_url || !review) {
            return res.status(400).json({status: 400, success: false, error: 'Invalid or incomplete data'})
        }

        const jsonData = await fs.readFile('./data/reviews.json', 'utf8');
        const reviews = JSON.parse(jsonData);
        
        reviews.forEach((r, i) => {
            if (review_index === i) {
                r.reviewer_name = reviewer_name
                r.reviewer_image_url = reviewer_image_url
                r.review = review
            }
        })

        await fs.writeFile('./data/reviews.json', JSON.stringify(reviews, null, 2));
        console.log(`Review ID: '${review_index}' updated`);

        res.status(200).json({status: 200, succesproject_indexs: true, message: 'Review updated successfully'})

    } catch(error) {
        console.error(error)
        res.status(500).json({status: 500, success: false, error: 'Internal server error'})
    }
});

app.delete("/reviews/:index/delete", async (req, res, next) => {
    try{

        const review_index = req.params.index

        const jsonData = await fs.readFile('./data/reviews.json', 'utf8');
        const reviews = JSON.parse(jsonData);

        reviews.splice(review_index, 1)     

        await fs.writeFile('./data/reviews.json', JSON.stringify(reviews, null, 2));
        console.log(`Review ID: '${review_index}' deleted`);

        res.status(200).json({status: 200, success: true, message: 'Review deleted successfully'})

    } catch(error) {
        console.error(error)
        res.status(500).json({status: 500, success: false, error: 'Internal server error'})
    }
});

app.post("/contact/me", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(500).json({status: 400, success: false, message: "Incomplete data sent." });
    }
    res.status(200).json({status:200, success: true, message: "Email sent successfully!" });
//   try {
//     await mailjetClient.post("send", { version: "v3.1" }).request({
//       Messages: [
//         {
//           From: { Email: `${process.env.MAIL_JET_EMAIL}`, Name: "Portfolio Website" },
//           To: [{ Email: `${process.env.MAIL_JET_EMAIL}`}],
//           Subject: `New Contact from ${name}`,
//           TextPart: `From: ${email}\n\n${message}`,
//         },
//       ],
//     });

//     res.status(200).json({status:200, success: true, message: "Email sent successfully!" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({status: 500, success: false, message: "Failed to send email." });
//   }
});

// Catch-all for undefined routes
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, '..', 'frontend', '404.html'));
});

// declaring the port
const port = process.env.PORT || 3300;

// run server on port
app.listen(port, () => {
  console.log(`Server is running on http://127.0.0.1:${port}`);
});