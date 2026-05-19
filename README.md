# JobSphere India 🇮🇳✨

**Live URL:** [https://jobsphereindiaa.netlify.app/](https://jobsphereindiaa.netlify.app/)

JobSphere India is a next-generation, premium 3D job search portal tailored for the Indian market. It provides a stunning, immersive experience for job seekers, combining modern glassmorphism design with interactive 3D elements, powered by real-time data from the Adzuna API.

![JobSphere India Banner](./public/favicon.svg) <!-- Note: Add an actual banner image here if available -->

## 🌟 Key Features

- **Interactive 3D Elements:** Features immersive 3D scenes built with React Three Fiber, including floating geometric shapes and an interactive Earth globe with Indian city nodes.
- **Real-time Job Listings:** Fully integrated with the Adzuna API to fetch live job postings across India.
- **Smart Search & Filters:** Search by keywords, location, job category, contract type, and minimum salary.
- **Modern UI/UX:** Built with a sleek dark mode, glassmorphic cards, smooth page transitions, and micro-animations via Framer Motion.
- **Bookmarking System:** Save jobs locally directly in the browser to view and apply later.
- **Job Details Modal:** Clean, distraction-free view for job descriptions, requirements, and estimated salaries.
- **Direct Applications:** "Apply Now" buttons redirect users directly to the actual company application sites.

## 🚀 Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Custom Vanilla CSS (CSS Variables, Glassmorphism)
- **3D Graphics:** React Three Fiber (`@react-three/fiber`, `@react-three/drei`), Three.js
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router v7
- **API:** Adzuna Job Search API

## 🛠️ Local Setup & Installation

Follow these steps to run the project locally on your machine.

### 1. Clone the repository
```bash
git clone https://github.com/Gautamsingh-debug/jobsphere-india.git
cd jobsphere-india
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
You need an API key from Adzuna to fetch real job data.
1. Sign up at [Adzuna Developer Portal](https://developer.adzuna.com/signup).
2. Create a new App to get your App ID and App Key.
3. Rename the `.env.example` file to `.env` (or create a new `.env` file).
4. Add your credentials:
```env
VITE_ADZUNA_APP_ID=your_app_id_here
VITE_ADZUNA_APP_KEY=your_app_key_here
```
*(Note: If the API keys are missing or invalid, the app gracefully falls back to using local mock data so you can still view the UI).*

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

## 🌐 Deployment

This project is optimized for deployment on Vercel and Netlify. 

### Netlify Deployment
The project includes a `netlify.toml` and `public/_redirects` file to handle build settings and client-side routing automatically. 
1. Connect your GitHub repository to Netlify.
2. Add the `VITE_ADZUNA_APP_ID` and `VITE_ADZUNA_APP_KEY` in the Netlify Environment Variables settings.
3. Deploy!

### Vercel Deployment
The project includes a `vercel.json` file for routing. 
1. Import the repository into Vercel.
2. Add your environment variables.
3. Deploy!

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Gautamsingh-debug/jobsphere-india/issues).

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
