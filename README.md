# 📚 Student Task Manager — Dockerized 3-Tier Web App

A fully containerized three-tier web application built with **Node.js**, **MySQL**, and **nginx**, orchestrated with **Docker Compose** and automated with **GitHub Actions CI/CD**.

---

## 🏗️ Architecture Overview
```
┌─────────────────────────────────────────────────┐
│                   USER BROWSER                  │
└─────────────────────┬───────────────────────────┘
                      │ Port 3000
┌─────────────────────▼───────────────────────────┐
│         TIER 1 — FRONTEND (nginx)               │
│   Serves HTML/CSS/JS · Proxies /api → backend   │
└─────────────────────┬───────────────────────────┘
                      │ Port 5000
┌─────────────────────▼───────────────────────────┐
│       TIER 2 — BACKEND (Node.js + Express)      │
│     REST API: GET/POST/PUT/DELETE /api/tasks     │
└─────────────────────┬───────────────────────────┘
                      │ Port 3306
┌─────────────────────▼───────────────────────────┐
│           TIER 3 — DATABASE (MySQL)             │
│             Stores tasks persistently            │
└─────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer    | Technology          | Port |
|----------|---------------------|------|
| Frontend | nginx + HTML/CSS/JS | 3000 |
| Backend  | Node.js + Express   | 5000 |
| Database | MySQL 8.0           | 3306 |

---

## 📁 Project Structure
```
three-tier-app/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── nginx.conf
│   └── Dockerfile
├── backend/
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .github/
│   └── workflows/
│       └── deploy.yml
└── README.md
```

---

## 🚀 How to Run Locally

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed
- [Git](https://git-scm.com/) installed

### Steps

**1. Clone the repository**
```bash
git clone https://github.com/Neolegend7632/three-tier-app.git
cd three-tier-app
```

**2. Start all services with Docker Compose**
```bash
docker-compose up --build
```

**3. Open the app in your browser**
```
http://localhost:3000
```

**4. Stop the app**
```bash
docker-compose down
```

---

## 🐳 Building Docker Images Manually
```bash
# Build frontend image
docker build -t your-dockerhub-username/frontend:v1 ./frontend

# Build backend image
docker build -t your-dockerhub-username/backend:v1 ./backend
```

---

## 📤 Pushing Images to Docker Hub
```bash
# Log in to Docker Hub
docker login

# Push frontend
docker push your-dockerhub-username/frontend:v1

# Push backend
docker push your-dockerhub-username/backend:v1
```

---

## ☁️ Deploying to a Linux VM

**1. SSH into your VM**
```bash
ssh -i your-key.pem ubuntu@YOUR_VM_PUBLIC_IP
```

**2. Install Docker and Docker Compose**
```bash
sudo apt update && sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER
newgrp docker
```

**3. Clone the repo onto the VM**
```bash
git clone https://github.com/Neolegend7632/three-tier-app.git
cd three-tier-app
```

**4. Run the app**
```bash
docker-compose up -d
```

**5. Access via public IP**
```
http://YOUR_VM_PUBLIC_IP:3000
```

> ⚠️ Make sure port **3000** is open in your VM's firewall/security group settings.

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

The pipeline in `.github/workflows/deploy.yml` automatically runs on every push to `main`.

**Pipeline Steps:**
1. ✅ Checks out the repository
2. 🔐 Logs in to Docker Hub
3. 🏗️ Builds and pushes the frontend image
4. 🏗️ Builds and pushes the backend image
5. 🚀 SSHs into the Linux VM and runs `docker-compose up -d`

### Required GitHub Secrets

Go to your repo → **Settings → Secrets and variables → Actions** and add:

| Secret Name          | Description                        |
|----------------------|------------------------------------|
| `DOCKERHUB_USERNAME` | Your Docker Hub username           |
| `DOCKERHUB_TOKEN`    | Your Docker Hub access token       |
| `VM_HOST`            | Public IP address of your Linux VM |
| `VM_USER`            | SSH username (e.g. `ubuntu`)       |
| `VM_SSH_KEY`         | Your private SSH key content       |

---

## 🌐 API Endpoints

| Method | Endpoint        | Description        |
|--------|-----------------|--------------------|
| GET    | /api/health     | Health check       |
| GET    | /api/tasks      | Get all tasks      |
| POST   | /api/tasks      | Create a new task  |
| PUT    | /api/tasks/:id  | Update task status |
| DELETE | /api/tasks/:id  | Delete a task      |

---

## 👥 Team

| Name                | Role                          |
|---------------------|-------------------------------|
| Mitaire Oteri       | Project Lead / GitHub Manager |
| Ridwan Shekoni      | Frontend Development & Presenter          |
| Jamiu Maemunat      | Backend Development           |
| Akintomide Tiwajope | Database & Docker Compose     |
| Tominsin Olusesi    | Dockerfile Engineer           |
| Feyijimi Stephen    | Cloud Deployment              |
| Ayomide Sufian      | Cloud Deployment              |
| Iroh Munachimso     | Documentation & Testing       |