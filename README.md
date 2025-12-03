# Medicine-Remainder
A smart medicine-tracking and reminder application built to help users manage their daily medications efficiently.
This app sends scheduled reminders, tracks tablet consumption, displays insights using charts, and includes an AI-powered chatbot MEDAI for health tips using Google AI APIs.

# 🚀 Features <br>
## ✅ Medicine Management

Add, edit, and delete medicines

Set dosage, schedule, and reminder timings

Mark medicine as taken/missed

Auto-track daily and monthly consumption

## ✅ ⏰ Smart Reminders

Push notifications at the exact medicine time

“Take now” action

Reminder history log

## ✅ 📊 Consumption Insights

Bar chart showing medicine name vs number of tablets consumed

Insight text summarizing consumption patterns

Helps users understand which medicines they use the most

<img width="1052" height="684" alt="Screenshot 2025-12-03 111046" src="https://github.com/user-attachments/assets/d7a8b5ed-2be1-413a-a6db-9a3c6ab4fec6" />


## ✅ 🤖 MEDAI – AI Health Assistant

Integrated AI chatbot for health & wellness tips

Uses Google AI API calls (Gemini)

Provides:

Daily health tips

Personalized lifestyle suggestions

Simple explanations for medicines (non-medical, non-diagnostic)

Motivation for better habits

<img width="1053" height="913" alt="Screenshot 2025-12-03 110819" src="https://github.com/user-attachments/assets/5f822991-e501-43b5-9721-6aa841221e72" />


## ✅ 🔧 Backend Functionality

Built with FastAPI

Stores reminders, usage logs, and analytics

Secure API endpoints

Uses SQLAlchemy
<img width="1050" height="902" alt="Screenshot 2025-12-03 092507" src="https://github.com/user-attachments/assets/feb059da-405e-4e9b-9f64-6006981b040e" /><br>
# 🛠 Installation & Setup
## 1️⃣ Clone Repo
```bash
git clone https://github.com/sandeepgotham092-cpu/Medicine-Reminder.git
cd medicine-reminder
```

## 2️⃣ Install Backend Dependencies
cd backend
```bash
pip install -r requirements.txt
```
## 3️⃣ Setup Environment Variables

### Create .env:
Get Google ai api key from google ai site and paste here.
```bash
GOOGLE_AI_KEY=your_api_key
```
## 4️⃣ Run Backend
```bash
uvicorn main:app --reload
```

5️⃣ Install Frontend
```bash
cd ../frontend
npm install
npm run dev
```

# 📦 Tech Stack
## Frontend

* React / React Native

* Recharts (for consumption insights)

* Axios


## Backend

* FastAPI

* SQLAlchemy

* SQLite

* AI

* Google Generative AI (Gemini API)

# 🤝 Contributions

Contributions are welcome!
Submit a PR or open an issue.
