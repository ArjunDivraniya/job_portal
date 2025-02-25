import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Register user
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // Basic validation
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
                success: false
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Process profile picture (only if provided)
        let profilePhotoUrl = null;
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhotoUrl = cloudResponse.secure_url;
        }

        // Create new user
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: {
                profilePhoto: profilePhotoUrl, // Will be null if no file is uploaded
            }
        });

        return res.status(201).json({
            message: "Account registered successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


// Login user
export const login = async (req, res) => {
    try {

        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect credentials",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect credentials",
                success: false
            });
        }

        if (role !== user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with the current role!",
                success: false
            });
        }

        // Generate JWT token
        const tokenData = { userId: user._id };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "7 days" });


        // Send token in cookie
        return res.status(200).cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            sameSite: "None",
            secure: true,


        }).json({
            message: `Welcome ${user.fullname}`,
            success: true,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

// Logout user
export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        console.log("🔹 Received Body:", req.body);
        console.log("🔹 Received Files:", req.files);

        // Ensure authentication works
        if (!req.userId) {
            return res.status(401).json({ success: false, message: "Unauthorized: No user ID found" });
        }

        let user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Extract fields
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        let skillsArray = skills ? skills.split(",").map(skill => skill.trim()) : [];

        // Declare profilePicUrl
        let profilePicUrl = user.profilePhoto || null;
        let resumeUrl = user.profile?.resume || null;

        // File Handling (Profile Photo)
        if (req.files?.profilePhoto?.[0]) {
            try {
                console.log("Processing Profile Photo:", req.files.profilePhoto[0]);
                const fileUri = getDataUri(req.files.profilePhoto[0]);
                console.log("Generated File URI:", fileUri); // Debug
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                console.log("Cloudinary Response:", cloudResponse);
                profilePicUrl = cloudResponse.secure_url;
            } catch (fileError) {
                console.error("Cloudinary Upload Error:", fileError);
                return res.status(500).json({ success: false, message: "Profile picture upload failed", error: fileError.message });
            }
        }

        // File Handling (Resume)
        if (req.files?.resume?.[0]) {
            try {
                const fileUri = getDataUri(req.files.resume[0]);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                resumeUrl = cloudResponse.secure_url;
            } catch (fileError) {
                console.error("Cloudinary Upload Error:", fileError);
                return res.status(500).json({ success: false, message: "File upload failed", error: fileError.message });
            }
        }

        // Update user data
        user.fullname = fullname || user.fullname;
        user.email = email || user.email;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.bio = bio || user.bio;
        user.skills = skillsArray.length > 0 ? skillsArray : user.skills;
        user.resume = resumeUrl;

        console.log("Existing Profile Photo:", user.profilePhoto);
        console.log("New Profile Photo URL:", profilePicUrl);

        if (profilePicUrl) {
            user.profilePhoto = profilePicUrl;
        }

        console.log("Updated Profile Photo in User Object:", user.profilePhoto);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profilePhoto: user.profilePhoto,
                resume: user.resume,
                bio: user.bio,
                skills: user.skills,
            },
        });
    } catch (error) {
        console.error("Update Profile Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
