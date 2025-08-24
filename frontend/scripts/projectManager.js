// Load projects
load_projects()

async function add_new_projects(){
    document.getElementById("projectForm").addEventListener("submit", async (e) => {

    e.preventDefault();

    // get form data
    const {isValid, data} = validate_input()

    if (!isValid) {
        return false
    }

    const response = await send_to_server('/project/add', 'POST', data)
    const response_data = await response.json()
    console.log(response_data)
    load_projects()
});
}

async function updateProject(i) {

    // get form data
    const {isValid, data} = validate_input()

    if (!isValid) {
        return false
    }

    const response = await send_to_server(`/project/${i}/edit`, 'PUT', data)

    const response_data = await response.json()
    console.log(response_data)
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

    data = { token }

    const response = await send_to_server(`/project/${i}/delete`, 'DELETE', data)

    const response_data = await response.json()
    console.log(response_data)

    await load_projects()
}

function validate_input() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const url = document.getElementById('url').value;
    const token = document.getElementById('token').value;
    const isValid = true
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
        project_title: title,
        description: description,
        url: url,
        token
    }

    return {isValid, data}
}

async function get_projects_from_server(){
    try{
        const response = await fetch('/projects')
        const response_data = await response.json()
        return response_data.data
    } catch (error) {
        console.log(error)
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

async function load_projects(){
    const projects = await get_projects_from_server()
    const container = document.getElementById("projectList");
    const admin = document.getElementById("projectAdminList");
    
    if (container) {
        if (projects.length === 0) {
            container.innerHTML = `
                <p class="no-project">No Project Available</p>
                <p class="no-project">Please add projects</p>
                
            `
        } else { 
            container.innerHTML = projects.map((p, i) => `
            <div class="project-card">
                <h3>${p.project_title}</h3>
                <p>${p.description}</p>
                <a href="${p.url}" target="_blank">View Video</a>
            </div>`).join("");
        } 
    }

    // Admin mode: Show editable list
    if (admin) {
        admin.innerHTML = projects.map((p, i) => `
            <tr class="admin-project-${i}">
                <td id="title-${i}"> ${p.project_title}</td>
                <td id="url-${i}">${p.url}</td>
                <td id="desc-${i}">${p.description}</td>
                <td>
                    <button onclick="editProject(${i})">Edit</button>
                    <button onclick="deleteProject(${i})">Delete</button>
                </td>
            </tr>
        `).join("");
    }

    await add_new_projects()

}

function editProject(i){
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


