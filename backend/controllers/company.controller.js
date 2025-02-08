import Company from "../models/company.model.js";

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
        const file = req.file; // Assuming this is for Cloudinary, but not used here

        // Cloudinary Upload Code (Example)
        // if (file) {
        //     const cloudinaryUpload = await cloudinary.v2.uploader.upload(file.path);
        //     updateData.logo = cloudinaryUpload.secure_url; // Assuming you are saving the logo URL
        // }

        const updateData = { name, description, website, location };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found!",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully!",
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
