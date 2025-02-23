import Company from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        
        // Check if companyName is provided
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required!",
                success: false
            });
        }

        // Check if company already exists
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company is already registered and cannot be registered again!",
                success: false
            });
        }

        // Create the new company
        company = await Company.create({
            name: companyName,
            userId: req.userId // Fix: Use req.userId instead of req.id
        });

        return res.status(201).json({
            message: "Company registered successfully!",
            company,
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

export const getCompany = async (req, res) => {
    try {
        const userId = req.userId; // Fix: Use req.userId instead of req.id
        const companies = await Company.find({ userId });

        if (companies.length === 0) {
            return res.status(404).json({
                message: "Companies not found!",
                success: false
            });
        }

        return res.status(200).json({
            companies,
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

// Get company by id
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }

        return res.status(200).json({
            company,
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

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        let logo;

        // Handle file upload (Cloudinary)
        if (req.file) {
            console.log("File received:", req.file);
            try {
                const fileUri = getDataUri(req.file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
                logo = cloudResponse.secure_url;
                console.log("Cloudinary Upload Success:", logo);
            } catch (uploadError) {
                console.error("Cloudinary Upload Error:", uploadError);
                return res.status(500).json({
                    message: "File upload failed",
                    success: false,
                    error: uploadError.message
                });
            }
        } else {
            console.log("No file uploaded.");
        }

        // Prevent undefined fields
        const updateData = {};
        if (name) updateData.name = name;
        if (description) updateData.description = description;
        if (website) updateData.website = website;
        if (location) updateData.location = location;
        if (logo) updateData.logo = logo;

        console.log("Updating Company with data:", updateData);

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            console.log("Company not found:", req.params.id);
            return res.status(404).json({
                message: "Company not found!",
                success: false
            });
        }

        console.log("Company found and updated:", company);

        return res.status(200).json({
            message: "Company information updated successfully!",
            company,
            success: true
        });

    } catch (error) {
        console.error("Update Company Error:", error);
        return res.status(500).json({
            message: "Server error",
            success: false,
            error: error.message
        });
    }
};
