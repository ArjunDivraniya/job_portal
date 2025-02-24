import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, TextField, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '../../utils/constant.js';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '../../redux/companySlice.js';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to register company');
        }
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">Create Company</Typography>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" style={{ marginTop: '40px' }}>
                <Typography variant="h5" gutterBottom>Your Company Name</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    What would you like to name your company? You can change this later.
                </Typography>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Company Name"
                    placeholder="JobHunt, Microsoft, etc."
                    margin="normal"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                    <Button variant="outlined" onClick={() => navigate('/admin/companies')}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={registerNewCompany}>Continue</Button>
                </div>
            </Container>
        </>
    );
};

export default CompanyCreate;
