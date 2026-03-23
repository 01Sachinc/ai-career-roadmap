# 🚀 AI Career Roadmap Generator for Students

An AI-powered platform to help **SSLC (10th)** and **PUC (12th)** students navigate their career paths with precision.

## ✨ Features
- **Student Profile Analysis**: Input Class, Interests, Skills, and Marks.
- **JWT Authentication**: Secure Signup/Login to save and track your roadmaps.
- **AI Career Suggestions**: 3 best-fit career options with detailed reasoning.
- **Interactive Roadmap**: Step-by-step guide with Courses, Skills, Timeline, and Exams.
- **Skill Gap Analysis**: Identify missing skills and how to bridge them.
- **Premium UI**: Modern, glassmorphism design, mobile responsive.

---

## 🛠 Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide React.
- **Backend**: Node.js, Express.js, Sequelize (MySQL).
- **Database**: MySQL (Railway).

---

## 🚀 Deployment Steps

### Frontend (Vercel)
1. Push the `frontend` folder to GitHub.
2. Link your repo to [Vercel](https://vercel.com).
3. Set the Root Directory to `frontend`.
4. Add Environment Variable: `VITE_API_URL=https://your-backend-url.com/api`.

### Backend (Render)
1. Push the `backend` folder to GitHub (or use a monorepo).
2. Connect to [Render](https://render.com) as a Web Service.
3. Set the Build Command: `npm install`.
4. Set the Start Command: `node server.js`.
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas URL.
   - `HF_API_KEY`: Your HuggingFace API Key.

---

## 📈 GitHub Push Steps
```bash
git init
git add .
git commit -m "Initial commit: AI Career Roadmap Generator"
git branch -M main
git remote add origin your-github-repo-url
git push -u origin main
```

---

## 💡 Sample Inputs for Testing

| Class | Interests | Skills | Marks | Expected Result |
|---|---|---|---|---|
| SSLC | Tech, Gadgets | Gaming | 85% | Software Engineer, Data Scientist, Hardware Tech |
| PUC | Medical, Biology | Empathy | 92% | Cardiologist, Biotech Researcher, Nurse |
| SSLC | Arts, Writing | Storytelling | 70% | Content Creator, Journalist, UX Designer |
| PUC | Business, Finance | Math | 80% | CA, Data Analyst, Entrepreneur |

---

Developed with ❤️ for future leaders.
