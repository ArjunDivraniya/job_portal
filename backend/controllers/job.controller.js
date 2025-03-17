import Job from "../models/job.model.js"
import User from "../models/user.model.js"

// Admin: Post a new job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.userId;

        // Validate that all fields are provided
        if (!title || !description || !requirements || !salary || !jobType || !location || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "All fields are required!",
                success: false
            });
        }

        // Create new job
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New Job created successfully!",
            job,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later.",
            success: false
        });
    }
}

// Students: Get all jobs with keyword search and pagination
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const page = parseInt(req.query.page) || 1;
        const pageSize = 10;

        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        const jobs = await Job.find(query)
            .populate({path: "company"})
            .sort({createdAt: -1})
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found!",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later.",
            success: false
        });
    }
}

// Students: Get job details by ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate('company created_by');

        if (!job) {
            return res.status(404).json({
                message: "Job not found!",
                success: false
            });
        }

        return res.status(200).json({
            job,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later.",
            success: false
        });
    }
}

// Admin: Get all jobs posted by the logged-in admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.userId;
        const jobs = await Job.find({ created_by: adminId });

        if (jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found for this admin!",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Something went wrong, please try again later.",
            success: false
        });
    }
}
export const getTopJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate({
                path: 'company',
                select: 'name logo' // Added 'logo' for company logo
            })
            .select('title description location salary position jobType')
            .limit(!req.user || req.user.role !== 'student' ? 9 : 0); // Show 9 jobs for non-students

        res.status(200).json({
            success: true,
            message: req.user && req.user.role === 'student'
                ? "Jobs fetched successfully."
                : "Limited job data shown.",
            jobs
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getRecommendedJobs = async (req, res) => {
    const { studentId } = req.params;

    try {
        const student = await User.findById(studentId);
        if (!student || student.role !== 'student') {
            return res.status(404).json({ message: "Student not found" });
        }

        const studentSkills = student.profile.skills;
        if (!studentSkills || studentSkills.length === 0) {
            return res.status(400).json({ message: "No skills found for this student" });
        }

        const recommendedJobs = await Job.find({
            requirements: { $in: studentSkills }
        });

        if (!recommendedJobs.length) {
            return res.status(404).json({ message: "No recommended jobs found" });
        }

        res.status(200).json({ recommendedJobs });
    } catch (error) {
        console.error('Error fetching recommended jobs:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getFilteredJobs = async (req, res) => {
    console.log('Received Filters:', req.query);
    const {
        jobType,
        companySize,
        salaryRange,
        experienceLevel,
        requirements,
        location
    } = req.query;

    const query = {};

    if (jobType) query.jobType = jobType;
    if (companySize) query.companySize = companySize;

    // Improved salary range logic with better validation
    if (salaryRange) {
        const [minSalary, maxSalary] = salaryRange.split('-').map(Number);
        if (!isNaN(minSalary) && !isNaN(maxSalary)) {
            query.salary = { $gte: minSalary, $lte: maxSalary };
        }
    }

    if (experienceLevel) query.experienceLevel = experienceLevel;

    if (requirements) {
        const requirementsArray = requirements.split(",").map((req) => req.trim());
        query.requirements = { $in: requirementsArray };
    }

    if (location) {
        query.location = { $regex: new RegExp(location, 'i') };
    }

    try {
        console.log('Generated Query:', query);  // ✅ Debugging
        const jobs = await Job.find(query).sort({ createdAt: -1 });

        if (!jobs.length) {
            return res.status(404).json({ success: false, message: "No jobs found for the selected filters." });
        }

        res.status(200).json({ success: true, jobs });
    } catch (error) {
        console.error('Error fetching jobs:', error);

        // Enhanced error response for better debugging
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};
