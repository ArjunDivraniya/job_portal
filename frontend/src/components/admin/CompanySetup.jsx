import React, { useEffect, useState } from 'react';
import {
    Button,
    TextField,
    CircularProgress,
    Container,
    Typography,
    Paper,
    IconButton,
    Box
} from '@mui/material';
import { ArrowBack, CloudUpload } from '@mui/icons-material';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant.js';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '../../hooks/useGetCompanyById.jsx';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', input.name);
        formData.append('description', input.description);
        formData.append('website', input.website);
        formData.append('location', input.location);
        if (input.file) {
            formData.append('file', input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/companies');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || '',
                description: singleCompany.description || '',
                website: singleCompany.website || '',
                location: singleCompany.location || '',
                file: singleCompany.file || null
            });
        }
    }, [singleCompany]);

    // Handle loading state
    if (!singleCompany) {
        return (
            <div>
                <Navbar />
                <Container maxWidth="sm" sx={{ mt: 4 }}>
                    <CircularProgress />
                </Container>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <IconButton onClick={() => navigate('/admin/companies')} sx={{ mb: 2 }}>
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h5" fontWeight="bold">Company Setup</Typography>
                    <form onSubmit={submitHandler}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    label="Company Name"
                                    fullWidth
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                />
                                <TextField
                                    label="Description"
                                    fullWidth
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <TextField
                                    label="Website"
                                    fullWidth
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                />
                                <TextField
                                    label="Location"
                                    fullWidth
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                />
                            </Box>

                            {/* File Upload Section */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                                <input
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    id="file-upload"
                                    type="file"
                                    onChange={changeFileHandler}
                                />
                                <label htmlFor="file-upload">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        component="span"
                                        startIcon={<CloudUpload />}
                                    >
                                        Choose File
                                    </Button>
                                </label>
                                {input.file && (
                                    <Typography variant="body2" sx={{ mt: 1, color: 'gray' }}>
                                        Selected: {input.file.name}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3 }} disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Update'}
                        </Button>
                    </form>
                </Paper>
            </Container>
        </div>
    );
};

export default CompanySetup;
