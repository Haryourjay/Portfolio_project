# 📂 Portfolio Project  

A **full-stack portfolio website** built with a **Node.js backend** and a **static frontend**.  

The application allows users to showcase projects, view details (with embedded videos), and contact the portfolio owner. A secret-key–based mechanism provides simple authentication-like and authorization-like features for project management.  

---

## 🚀 Features  

### 👤 Public  
- Main page listing all projects  
- Project detail page with video preview  
- About page for personal/professional bio  
- Contact page for client inquiries (Mailjet integration)  

### 🔐 Protected (Admin)  
- Add new project *(requires secret key)*  
- Update existing project *(requires secret key)*  
- Delete project details *(requires secret key)*  

---

## 🛠️ Tech Stack  

- **Backend:** Node.js, Express.js  
- **Frontend:** HTML5, CSS3, JavaScript (vanilla)  
- **Database-like:** JSON file (`projects.json`)  
- **Auth-like:** Secret key from `.env`  
- **Mail Integration:** Mailjet  

---

## ⚙️ Installation & Setup  

### 1. Clone the Repository  
```bash
git clone <github-link>
cd Portfolio_project
```

### 2. Setup Backend  
```bash
cd backend
npm install
```

- Ensure `projects.json` exists at:  
  ```
  backend/data/projects.json
  ```
  *(If missing, create an empty file: `[]`)*  

- Create a `.env` file in `backend/` with:  
  ```env
  SECRET=this_is_a_secret
  PORT=3300
  ```

### 3. Run the Backend  
```bash
npm start
```

Backend runs at: **http://localhost:3300**  

### 4. Open the Frontend  
Simply open `frontend/index.html` in your browser (or serve it with a static server).  

---

## 📂 Project Structure  

```
Portfolio_project/
├── backend/                  # Backend (Node.js + Express)
│   ├── app.js                # Entry point for backend
│   ├── data/                 # Data storage
│   │   └── projects.json     # Mock database
│   ├── package.json          # Dependencies
│   └── package-lock.json
│
├── frontend/                 # Frontend (static files)
│   ├── index.html            # Homepage
│   ├── about.html            # About page
│   ├── add_project.html      # Add project page (admin only)
│   ├── contact.html          # Contact page
│   ├── project_detail.html   # Project details page
│   ├── assets/               # Icons & images
│   ├── scripts/              # Frontend JS
│   │   ├── main.js
│   │   └── projectManager.js
│   └── styles/               # Frontend CSS
│       └── style.css
│
└── README.md
```

---

## 🔑 Usage  

- Visit: **http://localhost:3300/projects** to fetch all projects  
- Use the **frontend UI** to browse pages  
- Admin actions (add/update/delete) require the `SECRET` key  

---

## 🤝 Contributing  

Contributions are welcome! 🎉  

1. Fork the repo  
2. Create a new branch (`feature/your-feature`)  
3. Commit changes (`git commit -m "Add new feature"`)  
4. Push and open a Pull Request  

For bug reports and feature requests, open an **Issue** in the repository.  

---

## 📝 License  

This project is licensed under the **MIT License**. 
