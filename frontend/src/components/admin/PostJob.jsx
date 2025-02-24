import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    CircularProgress,
    Container,
    Paper,
    Grid,
} from '@mui/material';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (e) => {
        const selectedCompany = companies.find(company => company.name.toLowerCase() === e.target.value);
        setInput({ ...input, companyId: selectedCompany?._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Navbar />
            <Paper elevation={3} sx={{ padding: 4, maxWidth: 800, margin: '20px auto' }}>
                <form onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        {['title', 'description', 'requirements', 'salary', 'location', 'jobType', 'experience'].map((field) => (
                            <Grid item xs={12} sm={6} key={field}>
                                <TextField
                                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                                    name={field}
                                    value={input[field]}
                                    onChange={changeEventHandler}
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>
                        ))}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Number of Positions"
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                fullWidth
                                variant="outlined"
                            />
                        </Grid>
                        {companies.length > 0 && (
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Select a Company</InputLabel>
                                    <Select value={input.companyId} onChange={selectChangeHandler}>
                                        {companies.map((company) => (
                                            <MenuItem key={company._id} value={company.name.toLowerCase()}>
                                                {company.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        )}
                    </Grid>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ marginTop: 2 }}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} /> : "Post New Job"}
                    </Button>
                    {companies.length === 0 && (
                        <p style={{ textAlign: 'center', color: 'red', marginTop: '10px', fontWeight: 'bold' }}>
                            *Please register a company first before posting a job
                        </p>
                    )}
                </form>
            </Paper>
        </Container>
    );
};

export default PostJob;