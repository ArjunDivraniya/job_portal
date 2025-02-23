# Jobmentum 🚀

**Jobmentum** is an innovative job portal designed to connect job seekers with employers quickly and efficiently. It allows users to register, manage profiles, apply for jobs, and allows employers to post jobs and manage applications. Whether you're a job seeker looking for your next opportunity or an employer seeking to hire top talent, **Jobmentum** is the platform that helps you find the right match. 🌟

## **🔗 Key Links**

* **Prototype**: [Figma Prototype](#)
* **Node Server**: [Backend](https://jobmentum.onrender.com)
* **Frontend**: [Frontend](https://jomentum.netlify.app)
* **Documentation:** [API Documentation](https://documenter.getpostman.com/view/39189648/2sAYX9kzJW)
* **Backend Repo**: [GitHub - Backend](https://github.com/Priyasha-Yadav/Job-Portal/tree/main/backend)
* **Frontend Repo**: [GitHub - Frontend](https://github.com/Priyasha-Yadav/Job-Portal/tree/main/frontend)  

## Features ✨

### Job Seekers:

* **Browse Jobs** 🧳: Search for job opportunities by category, location, and more.
* **Apply for Jobs** 📝: Submit job applications with your resume.
* **Profile Management** 👤: Manage your personal details, upload resumes, and keep your profile up to date.
* **Job Alerts** 🔔: Get notified about new jobs that match your profile.

### Employers:

* **Post Jobs** 🗣️: Create and manage job postings for your company.
* **View Applications** 📑: Review job applications and shortlist candidates.
* **Company Profile Management** 🏢: Update and manage your company details and jobs.
* **Role-based Access** 🛡️: Manage permissions for different roles (Admin, Employer).

### Platform-wide Features:

* **User Authentication** 🔑: Register and log in with JWT-based authentication.
* **Job Management** 📋: Post new jobs, view job listings, and update job details.
* **Application Management** 📝: Job seekers can apply for jobs, and employers can manage applicants.
* **Role-based Access Control** 🛡️: Admins can manage the platform, while employers and job seekers have access to specific features.
* **Company Registration** 🏢: Companies can register and update their company details.

## Tech Stack 🖥️

* **Backend**: Node.js, Express.js
* **Database**: MongoDB with Mongoose for data modeling
* **Authentication**: JWT (JSON Web Token) for secure user authentication
* **Cloud Storage (Optional)**: Cloudinary or Firebase for resume and file uploads.
* **Real-time Updates & Notifications**: Firebase/Netlify/Render for real-time notifications (for job application status, job alerts).
* **Prototyping**: Figma for UI/UX design
* **Other**: dotenv (for environment variables), bcryptjs (for password hashing), multer (for file uploads), Winston (for logging)

## Installation ⚙️

To get started with **Jobmentum**, follow these steps to set up the project locally:

### Prerequisites 📋

* **Node.js** (version 14+ recommended)
* **MongoDB** (running locally or through MongoDB Atlas)

### Steps to Install 🏗️

1. Clone the repository:
   

```bash
   git clone https://github.com/yourusername/jobmentum.git

   ```

2. Navigate to the project directory:

```bash
cd job_portal
```

3. Install the dependencies:

```bash
npm install
```

4. Create a .env file in the root directory and set the following environment variables:

```bash
DB_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
PORT=your_port

```

5. Start the server:

```bash
npm start
```

6. To set up the frontend, navigate to the frontend directory and follow the same steps:

```bash
cd frontend
npm install
npm start
```

## **📂 Folder Structure**

The project is split into two main folders: `frontend` and `backend` .

```bash

├── backend/
│   ├── controllers/
│   ├── models/
│   ├── middlewares/
│   ├── routes/
│   ├── utils/         
│   ├── server.js
│   ├── app.js
│   ├── package.json
│   ├── package-lock.json
├── frontend/
│   ├── src/
│   ├── assets/
│   ├── components/
│   ├── utils/         
│   ├── App.jsx    
├── README.md
└── LICENSE
```

## **🎯 Contributing**

Contributions are encouraged from developers, designers, sustainability enthusiasts, and anyone who wants to make a difference! Whether you’re adding new features, reporting bugs, or improving the UI, your input is highly valued.

### How to Contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Open a pull request for review.

