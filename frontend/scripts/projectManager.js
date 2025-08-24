// Load projects
load_projects()

async function add_new_projects(){
    const formContainer = document.getElementById("projectForm")
    if (formContainer) {
        formContainer.addEventListener("submit", async (e) => {

            e.preventDefault();

            // get form data
            const {isValid, data} = validate_input()

            if (!isValid) {
                return false
            }

            try {
                const response = await send_to_server('/project/add', 'POST', data)
                const response_data = await response.json()
                console.log(response_data)
                await load_projects()
            } catch (error) {
                console.log(error)
            }
        });
    }
}

async function updateProject(i) {

    // get form data
    const {isValid, data} = validate_input(i)

    if (!isValid) {
        return false
    }

    try {
            const response = await send_to_server(`/project/${i}/edit`, 'PUT', data)
            const response_data = await response.json()
            console.log(response_data)
            await load_projects()
    } catch (error) {
        console.log(error)
    }
}

async function deleteProject(i) {
    const token = document.getElementById('token').value;

    if (!token) {
        const error_span = document.getElementById('error-span');
        error_span.innerHTML = 'Token is required'

        setTimeout(() => {
            error_span.innerHTML = '';
        }, 3000);
        return false
    }

    data = { token: token.trim() }

    const response = await send_to_server(`/project/${i}/delete`, 'DELETE', data)

    const response_data = await response.json()

    if (response_data.error) {
        alert(response_data.error)
    }

    if (response_data.message) {
        alert(response_data.message)
    }

    document.getElementById('token').value = ""

    await load_projects()
}

function validate_input(i = null) {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    let url = document.getElementById('url').value;
    const token = document.getElementById('token').value;

    if (i) {
        title = document.getElementById(`title-${i}`).value;
        description = document.getElementById(`desc-${i}`).value;
        url = document.getElementById(`url-${i}`).value;
    }
    
    
    let isValid = true
    let data = []

    if (!title || !description || !url || !token) {
        const error_span = document.getElementById('error-span');
        error_span.innerHTML = 'Invalid or incomplete data'

        setTimeout(() => {
            error_span.innerHTML = '';
        }, 3000);

        isValid = false;
        
        return {isValid, data}
    }

    data = {
        project_title: title.trim(),
        description: description.trim(),
        url: url.trim(),
        token: token.trim()
    }

    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('url').value = "";
    document.getElementById('token').value = "";

    return {isValid, data}
}

async function get_projects_from_server(retries = 3, delay = 1000){
    try{
        const response = await fetch('/projects')
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const response_data = await response.json()
        return response_data.data
    } catch (error) {
        if (retries > 0) {
            console.warn(`Retrying ${url}... attempts left: ${retries}`);
            await new Promise(res => setTimeout(res, delay));
            return get_projects_from_server(retries - 1, delay);
        } else {
            throw error;
        }
    }
}

async function send_to_server(url, method, data) {
    try{
        response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        
        return response
    } catch (error) {
        console.log(error)
    }
}

async function fetch_one_project(project_id, retries = 3, delay = 1000) {
    try {
        const response = await fetch(`/projects/${project_id}/get`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const response_data = await response.json();
        return response_data.data

    } catch (error) {
        if (retries > 0) {
            console.warn(`Retrying ${url}... attempts left: ${retries}`);
            await new Promise(res => setTimeout(res, delay));
            return fetch_one_project(retries - 1, delay);
        } else {
            throw error;
        }
    }
}

async function load_projects(){
    try{

        const projects = await get_projects_from_server() || []
    
        const container = document.getElementById("projectList");
        const admin = document.getElementById("projectAdminList");
        const project_detail_container = document.getElementById("project-info");

        if (container) {
            if (projects.length === 0) {
                container.innerHTML = `
                    <p class="no-project">No Project Available</p>
                    <p class="no-project">Please add projects</p>
                    
                `
            } else { 
                container.innerHTML = projects.map((p, i) => `
                <div class="project-card">
                    <h3>${p.project_title.trim()}</h3>
                    <p>${p.description.trim()}</p>
                    <a href="${p.url.trim()}" target="_blank">View Video</a>
                </div>`).join("");
            } 
        }

        // Admin mode: Show editable list
        if (admin && projects.length > 0) {
            admin.innerHTML = projects.map((p, i) => `
                <tr class="admin-project-${i}">
                    <td id="title-${i}"> ${p.project_title.trim()}</td>
                    <td id="url-${i}">${p.url.trim()}</td>
                    <td id="desc-${i}">${p.description.trim()}</td>
                    <td>
                        <button onclick="editProject(${i})">Edit</button>
                        <button onclick="deleteProject(${i})">Delete</button>
                    </td>
                </tr>
            `).join("");
        }

        if (project_detail_container) {
            // get project id from url
            const project_id = new URL(window.location.href).pathname.split("/").pop();
            const project = await fetch_one_project(project_id)

            if (!project) {
                return window.location.href = '/'
            }

            const project_info_container = document.getElementById('project-info')

            const html = `
                <h2>
            
            `
        }

        await add_new_projects()

    } catch (error) {
        console.log(error)
    }
    
}

async function editProject(i){
    await load_projects()

    const container = document.querySelector(`.admin-project-${i}`)
    const title = document.getElementById(`title-${i}`).textContent
    const url = document.getElementById(`url-${i}`).textContent
    const desc = document.getElementById(`desc-${i}`).textContent

    container.innerHTML = `
        <td>
            <input value="${title}" id="title-${i}" />
        </td>
        <td>
            <input value="${url}" id="url-${i}" />
        </td>
        <td>
            <textarea id="desc-${i}">${desc}</textarea>
        </td>
        <td>
            <button onclick="updateProject(${i})">Update</button>
        </td>    
    
    `
}


