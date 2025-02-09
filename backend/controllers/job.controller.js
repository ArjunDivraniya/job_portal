import Job from "../models/job.model.js"

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
