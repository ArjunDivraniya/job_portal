import React from 'react';
import { Box, Typography, Link, Divider, IconButton, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
  return (
    <Box sx={{ backgroundColor: '#1a1a1a', color: '#fff', padding: 4 }}>
      {/* Top Section - Links */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center">
        
        <Box sx={{ flex: 1, mb: { xs: 4, sm: 0 } }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Quick Links
          </Typography>
          <Box>
            <Link href="#" sx={{ display: 'block', color: '#bbb', mb: 1 }}>
              About Us
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#bbb', mb: 1 }}>
              Careers
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#bbb', mb: 1 }}>
              Contact
            </Link>
          </Box>
        </Box>

        <Box sx={{ flex: 1, mb: { xs: 4, sm: 0 } }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Services
          </Typography>
          <Box>
            <Link href="#" sx={{ display: 'block', color: '#bbb', mb: 1 }}>
              Web Development
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#bbb', mb: 1 }}>
              Mobile App Development
            </Link>
            <Link href="#" sx={{ display: 'block', color: '#bbb', mb: 1 }}>
              UI/UX Design
            </Link>
          </Box>
        </Box>

        <Box sx={{ flex: 1, mb: { xs: 4, sm: 0 } }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
            Follow Us
          </Typography>
          <Box>
            <IconButton sx={{ color: '#bbb', mr: 1 }}>
              <FacebookIcon />
            </IconButton>
            <IconButton sx={{ color: '#bbb', mr: 1 }}>
              <TwitterIcon />
            </IconButton>
            <IconButton sx={{ color: '#bbb', mr: 1 }}>
              <LinkedInIcon />
            </IconButton>
            <IconButton sx={{ color: '#bbb', mr: 1 }} aria-label="Instagram">
              <InstagramIcon />
            </IconButton>
            <IconButton sx={{ color: '#bbb', mr: 1 }} aria-label="YouTube">
              <YouTubeIcon />
            </IconButton>
          </Box>
        </Box>
      </Stack>

      <Divider sx={{ my: 4, backgroundColor: '#444' }} />

      {/* Bottom Section - Copyright */}
      <Typography variant="body2" align="center" sx={{ color: '#bbb' }}>
        © 2025 Jobmentum. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
