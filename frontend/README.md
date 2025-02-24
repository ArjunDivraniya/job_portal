# Jobmentum Frontend

## Overview
The frontend for **Jobmentum**, a modern job application and recruitment platform. Built using **React.js**, this frontend provides an intuitive and seamless user experience for job seekers and employers. It integrates with the **Jobmentum Backend API** for authentication, job listings, applications, and company management.

## Features
 **User Authentication** (Register, Login, Logout, Role-based access)  
 **Job Listings** (View, Search, Filter jobs)  
 **Job Applications** (Apply to jobs, track application status)  
 **Company Management** (View company profiles, admin features)  
 **Profile Management** (Update personal details, upload resume)  

---

## Tech Stack  
- **Frontend Framework**: React.js  
- **State Management**: Redux  
- **UI Components**: Tailwind CSS / Material-UI / Styled Components  
- **Routing**: React Router  
- **API Handling**: Axios  
- **Form Handling**: React Hook Form / Formik  
- **Authentication**: JWT stored in HTTP-only cookies  
- **Environment Variables**: `.env` for API URLs  

---

## Installation  

### 1. Clone the Repository  
```sh
git clone https://github.com/your-github-username/jobmentum-frontend.git
```

### 2. Navigate to the project folder & install dependencies
```bash
cd frontend
npm install
```

## Folder Structure
```bash
frontend/
│── node_modules/       # Dependencies
│── public/             # Static assets (favicon, images, etc.)
│── src/
│   │── components/     # Reusable UI components
│   │── hooks/          # Custom React hooks
│   │── redux/          # Redux store & slices
│   │── utils/          # Utility functions (e.g., constants)
│   │── App.jsx         # Main App component
│   │── main.jsx        # Entry point
│── .gitignore          # Ignored files
│── eslint.config.js    # ESLint configuration
│── index.html          # Main HTML file
│── package.json        # Dependencies & scripts
│── vite.config.js      # Vite configuration
│── README.md           # Project documentation
```

## Contribution
1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit changes (`git commit -m 'Added new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

---

**Made with ❤️ for Jobmentum 🚀**