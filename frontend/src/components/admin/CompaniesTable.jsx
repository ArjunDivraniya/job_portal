import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Popover,
  Typography,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedCompany, setSelectedCompany] = React.useState(null);
  const navigate = useNavigate();

  // Filter companies based on search term from the Redux store
  const filteredCompanies = companies.filter((company) => {
    if (!searchCompanyByText) {
      return true;
    }
    return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
  });

  const handlePopoverOpen = (event, company) => {
    setAnchorEl(event.currentTarget);
    setSelectedCompany(company);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedCompany(null);
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Logo</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#555' }}>Date</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: '#555' }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCompanies?.map((company, index) => (
              <TableRow
                key={company._id}
                sx={{
                  '&:hover': {
                    backgroundColor: '#f1f1f1',
                  },
                  backgroundColor: index % 2 === 0 ? '#fff' : '#f9f9f9', // Alternating row colors
                }}
              >
                <TableCell>
                  <Avatar
                    src={company.logo}
                    alt={company.name}
                    sx={{
                      width: 60, // Increase the size of the logo
                      height: 60, // Increase the size of the logo
                      borderRadius: '50%',
                      border: '2px solid #ddd', // Border around Avatar
                    }}
                  />
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split('T')[0]}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={(event) => handlePopoverOpen(event, company)}>
                    <MoreHorizIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Typography
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#f0f0f0',
              borderRadius: 1,
            },
          }}
          onClick={() => {
            navigate(`/admin/companies/${selectedCompany?._id}`);
            handlePopoverClose();
          }}
        >
          <EditIcon sx={{ mr: 1 }} /> Edit
        </Typography>
      </Popover>
    </>
  );
};

export default CompaniesTable;
