# Jobmentum Backend

## Overview

The backend for Jobmentum, a job application and recruitment platform. Built using **Node.js, Express, and MongoDB**, this backend handles user authentication, profile management, job listings, applications, and more.

## **🔗 Key Links**

* **Documentation:** [API Documentation](https://documenter.getpostman.com/view/39189648/2sAYX9kzJW)
* **Node Server**: [Backend](https://jobmentum.onrender.com)
* **Backend Repo**: [GitHub - Backend](https://github.com/Priyasha-Yadav/Job-Portal/tree/main/backend)

## API Endpoints

### User Profile

| Method | Endpoint        | Description |
|--------|----------------|-------------|
| POST    | `/api/v1/user/register` | Create user profile |
| POST    | `/api/v1/user/login` | Login profile |
| POST   | `/api/v1/user/profile/update` | Update profile (name, email, resume, etc.) |
| GET    | `/api/v1/user/logout` | Logout profile |

### Jobs

| Method | Endpoint                | Description                                                   |
|--------|-------------------------|---------------------------------------------------------------|
| GET    | `/api/v1/job/get` | Get all job listings                                          |
| POST   | `/api/v1/job/post` | Create a new job listing                                      |
| GET    | `/api/v1/job/get/:id` | Get details of a specific job by ID                           |
| GET    | `/api/v1/job/getadminjobs` | Get all job listings posted by the admin (company)            |

### Applications

| Method | Endpoint        | Description |
|--------|----------------|-------------|
| GET   | `/api/v1/application/apply/:id` | Apply for a job |
| GET   | `/api/v1/application/get` | View all job applications |
| GET   | `/api/v1/application/:id/applicants` | Get applicants applied on job |
| POST  | `/api/v1/application/status/:id/update` | Get admin status |

### Companies

| Method | Endpoint                | Description                                                   |
|--------|-------------------------|---------------------------------------------------------------|
| POST   | `/api/v1/company/register` | Register a new company by providing company details            |
| GET    | `/api/v1/company/get` | Get all registered companies                                   |
| GET    | `/api/v1/company/get/:id` | Get details of a specific company by ID                        |
| PUT    | `/api/v1/company/update/:id` | Update company details (e.g., company name) by providing company ID |

## Features

* **User Authentication** (Registration, Login, Logout, Role-based Access)
* **Profile Management** (Update user details, profile picture, resume upload)
* **Job Listings** (Create, Read, Update, Delete job posts)
* **Job Applications** (Apply to jobs, track applications, employer reviews)
* **Cloudinary Integration** (For file uploads - profile pictures & resumes)
* **Secure Password Hashing** (Using bcrypt)
* **JWT-based Authentication** (Stored in HTTP-only cookies)
* **Mongoose for MongoDB** (Schema-based data modeling)

## Tech Stack

* **Backend Framework**: Node.js with Express.js
* **Database**: MongoDB with Mongoose ORM
* **Authentication**: JWT (JSON Web Tokens) & bcrypt for password hashing
* **File Storage**: Cloudinary (for profile pictures and resumes)
* **Environment Variables**: dotenv
* **CORS Handling**: cors package

## Installation

### 1. Clone the repository [ Fork the repository and clone it in your local ]

```sh
git clone https://github.com/your-github-username/jobmentum-backend.git
```

### 2. Navigate and install dependencies

```sh
cd backend
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory and add the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Start the server

```sh
npm start
```

The server will run on `http://localhost:8000`

## Folder Structure

```
backend/
│── config/             # Configuration files (DB, cloudinary, etc.)
│── controllers/       # Request handlers (auth, user, jobs, applications)
│── middleware/        # Middleware functions (auth, error handling)
│── models/            # Mongoose schemas (User, Job, Application)
│── routes/            # API routes (auth, user, jobs, applications)
│── utils/             # Utility functions (file upload, JWT, etc.)
│── .env               # Environment variables (ignored in Git)
│── node_modules/      # Dependencies
│── .gitignore         # Ignored files
│── package.json       # Dependencies & scripts
│── app.js             # Express app setup
│── server.js          # Entry point (server setup)
│── package.json       # Dependencies and scripts
│── README.md          # Project documentation
```

## Contribution

1. Fork the repository
2. Create a new branch (`feature-branch`)
3. Commit changes (`git commit -m 'Added new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a Pull Request

---

**Made with ❤️ for Jobmentum 🚀**
