import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },

    phoneNumber: {
        type: Number,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },

    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto: {
            type: String,
            default: ""
        },

        // New Fields for Analytics Dashboard
        applications: [
            {
                jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
                appliedAt: { type: Date, default: Date.now }
            }
        ],

        matchedSkills: [{ type: String }], // For Skill Relevance Calculation

        jobListings: [{
            industry: { type: String },
            techStack: [{ type: String }],
            location: { type: String },
            salaryRange: { type: String },
            experienceLevel: { type: String }
        }],

        interviewCalls: [
            {
                jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
                callDate: { type: Date }
            }
        ]
    },
}, { timestamps: true });

export default mongoose.model('User', userSchema);
