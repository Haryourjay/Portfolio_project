// Load projects
load_projects()

async function editData(type, index) {
    if (type === 'project') {
        const project = await fetch_one_from_server(type, index)
        if(!project) {
            const error_span = document.getElementById('error-span');
            error_span.innerHTML = 'Project not found'

            setTimeout(() => {
                error_span.innerHTML = '';
            }, 3000);

            console.log('Project not found')
            return
        }
        console.log(project)
        document.getElementById('project-title').value = project.project_title;
        document.getElementById('project-desc').value = project.description;
        document.getElementById('project-video').value = project.video_url;
        document.getElementById('project-thumbnail').value = project.thumbnail_url;
        const addProjectBtn = document.getElementById('add-project-btn');
        const projectForm = document.getElementById('projectForm');

        addProjectBtn.textContent = 'UPDATE'
        projectForm.removeEventListener("submit", async (e) => {

            e.preventDefault();

            // get form data
            const {isValid, data} = validate_input('project')

            if (!isValid) {
                return false
            }

            try {
                const response = await send_to_server('/projects/add', 'POST', data)
                const response_data = await response.json()
                console.log(response_data)
                await load_projects()
            } catch (error) {
                console.log(error)
            }
        })

        projectForm.addEventListener('submit', async (e)=> {
            e.preventDefault()
            const {isValid, data} = validate_input('project')

            if (!isValid) {
                return false
            }

            try {
                const response = await send_to_server(`/projects/${index}/update`, 'PUT', data)
                const response_data = await response.json()
                console.log(response_data)
                await load_projects()
            } catch (error) {
                console.log(error)
            }
        })
    } else {
        const review = await fetch_one_from_server(type, index)
        if(!project) {
            const error_span = document.getElementById('error-span');
            error_span.innerHTML = 'Project not found'

            setTimeout(() => {
                error_span.innerHTML = '';
            }, 3000);
        }

        document.getElementById('reviewer-name').value = review.reviewer_name;
        document.getElementById('reviewer-image').value = review.review_image_url;
        document.getElementById('project-video').value = review.review;
        const addReviewBtn = document.getElementById('review-btn');
        const reviewForm = document.getElementById('reviewForm');

        addReviewBtn.textContent = 'UPDATE'
        reviewForm.removeEventListener("submit", async (e) => {

            e.preventDefault();

            // get form data
            const {isValid, data} = validate_input('review')

            if (!isValid) {
                return false
            }

            try {
                const response = await send_to_server('/reviews/add', 'POST', data)
                const response_data = await response.json()
                console.log(response_data)
                await load_projects()
            } catch (error) {
                console.log(error)
            }
        })

        reviewForm.addEventListener('submit', async (e)=> {
            e.preventDefault()
            const {isValid, data} = validate_input('review')

            if (!isValid) {
                return false
            }

            try {
                const response = await send_to_server(`/reviews/${index}/update`, 'PUT', data)
                const response_data = await response.json()
                console.log(response_data)
                await load_projects()
            } catch (error) {
                console.log(error)
            }
        })
    }
}

async function btnEventListenerManager(btnClass) {
    const btns = document.querySelectorAll(`.${btnClass}`)

    if (btnClass === 'project-delete-btn') {
        btns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                deleteFromServer('projects', btn.value)
            })
        })
    } else if (btnClass === 'review-delete-btn') {
        btns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                deleteFromServer('reviews', btn.value)
            })
        })
    } else if (btnClass === 'project-edit-btn') {
        btns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                editData('project', btn.value)
            })
        })
    } else if (btnClass === 'review-edit-btn') {
        btns.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault()
                editData('review', btn.value)
            })
        })
    } 
    
}

async function add_new_projects(){
    const projectForm = document.getElementById("projectForm")
    const reviewForm = document.getElementById("reviewForm")
    if (projectForm) {
        projectForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            // get form data
            const {isValid, data} = validate_input('project')

            if (!isValid) {
                return false
            }

            try {
                const response = await send_to_server('/projects/add', 'POST', data)
                const response_data = await response.json()
                console.log(response_data)
                await load_projects()
            } catch (error) {
                console.log(error)
            }
        });
    }

    if (reviewForm) {
        reviewForm.addEventListener("submit", async (e) => {

            e.preventDefault();

            // get form data
            const {isValid, data} = validate_input('review')

            if (!isValid) {
                return false
            }

            try {
                const response = await send_to_server('/reviews/add', 'POST', data)
                const response_data = await response.json()
                console.log(response_data)
                await load_projects()
            } catch (error) {
                console.log(error)
            }
        });
    }
}

async function updateInServer(type, index) {

    // get form data
    const {isValid, data} = validate_input(type)

    if (!isValid) {
        return false
    }

    try {
            const response = await send_to_server(`/${type}/${index}/edit`, 'PUT', data)
            const response_data = await response.json()
            console.log(response_data)
            await load_projects()
    } catch (error) {
        console.log(error)
    }
}

async function deleteFromServer(type, index) {

    const response = await send_to_server(`/${type}/${index}/delete`, 'DELETE')

    const response_data = await response.json()

    if (response_data.error) {
        alert(response_data.error)
    }

    if (response_data.message) {
        alert(response_data.message)
    }

    await load_projects()
}

function validate_input(type) {
    if (type === 'project') {
        const projectTitle = document.getElementById('project-title').value;
        const projectDescription = document.getElementById('project-desc').value;
        const videoUrl = document.getElementById('project-video').value;
        const thumbnailUrl = document.getElementById('project-thumbnail').value;

        let isValid = true
        let data = []

        if (!projectTitle || !projectDescription || !videoUrl || !thumbnailUrl) {
            const error_span = document.getElementById('error-span');
            error_span.innerHTML = 'Invalid or incomplete data'

            setTimeout(() => {
                error_span.innerHTML = '';
            }, 3000);

            
            return {isValid, data}
        }

        data = {
            project_title: projectTitle.trim(),
            description: projectDescription.trim(),
            video_url: videoUrl.trim(),
            thumbnail_url: thumbnailUrl.trim()
        }

        document.getElementById('project-title').value = "";
        document.getElementById('project-desc').value = "";
        document.getElementById('project-video').value = "";
        document.getElementById('project-thumbnail').value = "";

        return {isValid, data}

    } else if (type === 'review') {
        const reviewerName = document.getElementById('reviewer-name').value;
        const reviewerImageUrl = document.getElementById('reviewer-image').value;
        const review = document.getElementById('review').value;

        let isValid = true
        let data = []

        if (!reviewerName || !reviewerImageUrl || !review) {
            const error_span = document.getElementById('error-span');
            error_span.innerHTML = 'Invalid or incomplete data'

            setTimeout(() => {
                error_span.innerHTML = '';
            }, 3000);

            
            return {isValid, data}
        }

        data = {
            reviwer_name: reviewerName.trim(),
            reviewer_image_url: reviewerImageUrl.trim(),
            review: review.trim(),
        }

        document.getElementById('reviewer-name').value = "";
        document.getElementById('reviewer-image').value = "";
        document.getElementById('review').value = "";

        return {isValid, data}
    }

}

async function get_data_from_server(data, retries = 3, delay = 1000){
    try{
        const response = await fetch(`/${data}`)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const response_data = await response.json()
        return response_data.data
    } catch (error) {
        if (retries > 0) {
            console.warn(`Retrying: [GET] /${data}... attempts left: ${retries}`);
            await new Promise(res => setTimeout(res, delay));
            return get_data_from_server(data, retries - 1, delay);
        } else {
            console.error(error);
        }
    }
}

async function send_to_server(url, method, data = []) {
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

async function fetch_one_from_server(type, project_id) {
    try {
        const response = await fetch(`/${type}s/${project_id}/get`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const response_data = await response.json();
        return response_data.data

    } catch (error) {
        console.error(error)
    }
}

async function load_projects(){
    try{

        const projects = await get_data_from_server('projects') || []
        const reviews = await get_data_from_server('reviews') || []

        const container = document.getElementById("projectList");
        const reviewContainer = document.getElementById("reviewList");
        const admin = document.getElementById("projectAdminList");
        const reviewAdmin = document.getElementById("reviewAdmin");
        // const project_detail_container = document.getElementById("project-info");

        if (container) {
            if (projects.length === 0) {
                container.innerHTML = `
                    <p class="no-project">No Project Available</p>
                    <p class="no-project">Please add projects</p>
                    
                `
            } else { 
                container.innerHTML = projects.map((p, i) => `
                <a href="project_detail.html?project_id=${i}" class="slide swiper-slide">
                    <div class="details">
                        <h3 class="project-title">${p.project_title.trim()}</h3>

                        <p>${p.description.trim()} ...</p>
                    </div>
                    <img src="${p.thumbnail_url.trim()}" alt="">
                </a>
                `).join("");

            } 
        }

        if (reviewContainer) {
            if (reviews.length === 0) {
                reviewContainer.innerHTML = `
                    <p class="no-project">No Review Available</p>
                    <p class="no-project">Please add review</p>
                    
                `
            } else {      

                reviewContainer.innerHTML = reviews.map((r,i) => `
                    <div class="slide swiper-slide">
                        <img src="${r.review_image_url}" alt="">
                        <p>"${r.review}"</p>

                        <span>- ${r.reviewer_name}</span>
                    </div>
                `).join("");
            } 
        }

        // Admin mode: Show editable list
        if (admin && projects.length > 0) {
            admin.innerHTML = projects.map((p, i) => `
                <div class="slide swiper-slide">
                    <div class="details">
                        <h3 class="project-title">${p.project_title.trim()}</h3>

                        <p>${p.description.trim()} ...</p>
                        <button class="project-delete-btn" id="project-delete-btn-${i}" value="${i}">❌</button>
                        <button id="project-edit-btn-${i}" class="project-edit-btn" value="${i}">✏️</button>
                    </div>
                    <img src="./assets/images/ph-1.png" alt="">
                </div>
                
            `).join("");

            await btnEventListenerManager('project-delete-btn')
            await btnEventListenerManager('project-edit-btn')

            reviewAdmin.innerHTML = reviews.map((r,i) => `
                <div class="slide swiper-slide">
                    <img src="${r.review_image_url}" alt="">
                    <p>"${r.review}"</p>

                    <span>- ${r.reviewer_name}</span>
                    <button class="review-delete-btn" id="review-delete-btn-${i}" value="${i}">❌</button>
                    <button class="review-edit-btn" id="review-edit-btn-${i}" value="${i}">✏️</button>
                </div>
            `).join("")

            await btnEventListenerManager('review-delete-btn')
            await btnEventListenerManager('review-delete-btn')
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


