import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ImageAvatars from './avatar.jsx';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { Link } from 'react-router-dom';


export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="text"
        onClick={handleClick}
        sx={{
          minWidth: 0,
          padding: 0,
          borderRadius: '50%',
          boxShadow: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8,
          },
        }}
      >
        <ImageAvatars sx={{ borderRadius: '50%' }} />
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          marginLeft: '-5%',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography component="div" sx={{ p: 2, minWidth: 250, fontFamily: 'Roboto, sans-serif' }}>
          {/* User Info Section */}
          <div className="gap-4 flex items-center">
            <ImageAvatars sx={{ width: 40, height: 40, borderRadius: '50%' }} />
            <div>
              <h4 className="font-semibold text-lg">Sylvia Chester</h4> {/* Increased font weight for name */}
              <div className="text-sm text-muted-foreground font-light">Lorem ipsum dolor sit.</div> {/* Lighter font for description */}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 mt-4">
          <Link to="/profile">
              <Button
                variant="text"
                fullWidth // This ensures the button takes up the entire width
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  },
                  color: '#333',
                  fontSize: '14px',
                  fontWeight: '500', // Medium weight for the button text
                }}
              >
                <PersonOutlineOutlinedIcon sx={{ marginRight: '8px' }} />
                View Profile
              </Button>
            </Link>
            <Link to="/">

            <Button
              variant="text"
              fullWidth
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: '6px 12px',
                borderRadius: '6px',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
                color: '#333',
                fontSize: '14px',
                fontWeight: '500', // Medium weight for the button text
              }}
            >
              <LogoutIcon sx={{ marginRight: '8px' }} />
              Logout
            </Button>
            </Link>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
