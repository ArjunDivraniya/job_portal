import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar.jsx';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '../../utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '../../redux/applicationSlice';
import { Container, Typography, Box } from '@mui/material';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector((store) => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        };
        fetchAllApplicants();
    }, [dispatch, params.id]);

    return (
        <div>
            {/* Navbar Component */}
            <Navbar />

            {/* Main Content */}
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h5" component="h1" fontWeight="bold" gutterBottom>
                        Applicants ({applicants?.applications?.length})
                    </Typography>
                </Box>

                {/* Applicants Table */}
                <ApplicantsTable />
            </Container>
        </div>
    );
};

export default Applicants;
