# 🎨 Portfolio Project

A basic user portfolio website with **project showcase**, **authentication-like features**, and **video embedding via Google Drive**.  
The system is designed with a **frontend–backend separation** for scalability and flexibility.

---

## 📌 Features

- **Main Page** – View all projects  
- **Project Detail Page** – View a specific project (with embedded video)  
- **About Page** – User’s profile & background  
- **Contact Page** – Client can send messages (via Mailjet)  
- **Project Management**  
  - Add project (requires secret key)  
  - Edit project (requires secret key)  
  - Update project (requires secret key)  

---

## 🏗️ Project Structure

```
.
├── backend
│   ├── app.js
│   ├── data
│   │   └── projects.json
│   ├── package.json
│   └── package-lock.json
├── frontend
│   ├── about.html
│   ├── add_project.html
│   ├── assets
│   │   ├── icons
│   │   └── images
│   ├── contact.html
│   ├── index.html
│   ├── project_detail.html
│   ├── scripts
│   │   ├── main.js
│   │   └── projectManager.js
│   └── styles
│       └── style.css
└── README.md
```

---

## ⚡ System Architecture

```
                    ┌──────────────────┐
                    │   Google Drive   │
                    │  (Video Hosting) │
                    └───────▲──────────┘
                            │
              Embed link     │
                            │
┌─────────────┐      ┌──────┴──────┐      ┌──────────────┐
│   Browser   │◄────►│   Netlify   │◄────►│   Render     │
│  (Visitor)  │      │ (Frontend)  │      │ (Node.js API)│
└─────────────┘      └─────────────┘      └──────────────┘
```

---

## 📸 Screenshots & Demo

### 🔹 Home Page
![Home Page Screenshot](./frontend/assets/images/home-page.png)  
*(Replace with actual screenshot)*  

---

### 🔹 Project Detail Page (with video embed)
![Project Detail Screenshot](./frontend/assets/images/project-detail.png)  
*(Replace with actual screenshot)*  

---

### 🔹 Add Project Page
![Add Project Screenshot](./frontend/assets/images/add-project.png)  
*(Replace with actual screenshot)*  

---

### 🔹 Contact Page
![Contact Page Screenshot](./frontend/assets/images/contact-page.png)  
*(Replace with actual screenshot)*  

---

### 🔹 Demo GIF (Optional)
![Demo GIF](./frontend/assets/images/demo.gif)  
*(Replace with screen recording of project usage)*  

---

## 🚀 Getting Started

### 1️⃣ Clone Repository
```bash
git clone '<github link>'
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `projects.json` file in:
```
backend/data/projects.json
```

Create a `.env` file in:
```
backend/.env
```

With content:
```env
SECRET=this_is_a_secret
PORT=3300
```

Run the server:
```bash
npm start
```

### 3️⃣ Frontend Setup
Navigate to the `frontend/` folder and open `index.html` in your browser.  
Deploy using **Netlify** for free hosting.  

---

## 📹 Video Hosting with Google Drive

Each project’s demo video is uploaded to **Google Drive**.  
- Get the `VIDEO_ID` from the share link.  
- Use the embed format:  

```html
<iframe src="https://drive.google.com/file/d/VIDEO_ID/preview" 
        width="640" height="480" allow="autoplay"></iframe>
```

✅ Videos stream directly from Google Drive → Browser  
✅ Saves Netlify & backend bandwidth  
✅ Works seamlessly with heavy video files  

---

## ⚡ Quick Demo Example

### ✅ Backend API Response (`/projects/1`)

```json
{
  "id": 1,
  "title": "Portfolio Website",
  "description": "A personal portfolio project showcasing my work.",
  "videoUrl": "https://drive.google.com/file/d/1a2B3cD4EfGhIjKlm/preview"
}
```

### ✅ Frontend Integration (`project_detail.html`)

```html
<h2 id="project-title"></h2>
<p id="project-description"></p>
<div id="video-container"></div>

<script>
async function loadProject() {
  try {
    const response = await fetch("http://localhost:3300/projects/1");
    const project = await response.json();

    document.getElementById("project-title").innerText = project.title;
    document.getElementById("project-description").innerText = project.description;

    document.getElementById("video-container").innerHTML = `
      <iframe src="${project.videoUrl}" width="640" height="480" allow="autoplay"></iframe>
    `;
  } catch (error) {
    console.error("Error loading project:", error);
  }
}

loadProject();
</script>
```

---

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript (hosted on Netlify)  
- **Backend:** Node.js + Express (hosted on Render)  
- **Database-like:** JSON file (`projects.json`)  
- **Video Hosting:** Google Drive embed links  
- **Email Service:** Mailjet  

---

## 📌 Future Improvements
- Move from JSON file → Database (MongoDB / PostgreSQL).  
- JWT-based authentication for project management.  
- Admin dashboard for project uploads.  
