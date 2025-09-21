


load_projects()

async function load_projects() {
    const projectContainer = document.getElementById('projectContainer')
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project_id');

    const project = await fetch_one_project(projectId)

    html = `
        <h2>${project.project_title}</h2>

        <p>${project.description}</p>

        <div class="video-wrapper flex justify-center">
            <iframe src="${project.url}" 
            width="640" height="480" 
            allow="autoplay" 
            allowfullscreen></iframe>
        </div>
    
    `

    projectContainer.innerHTML = html
    

}

async function fetch_one_project(project_id) {
    try {
        const response = await fetch(`/projects/${project_id}/get`);
        if (!response.ok) {
            if (response.status === 404)
                window.location.href = "index.html"
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const response_data = await response.json();
        return response_data.data

    } catch (error) {
        console.error(error)
    }
}