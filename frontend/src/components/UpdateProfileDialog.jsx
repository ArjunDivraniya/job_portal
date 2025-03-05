import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Chip, Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useDispatch, useSelector } from 'react-redux';
import { toast, Toaster } from 'sonner';
import { setUser } from '../redux/authSlice.js';
import { USER_API_END_POINT } from '../utils/constant.js';

const UpdateProfileDialog = ({ open, setOpen }) => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.map(skill => skill) || "",
    resume: user?.profile?.resume || null
  });

  const [fileError, setFileError] = useState('');
  const [loading, setLoading] = useState(false);

  // Close dialog
  const handleClose = () => setOpen(false);

  // Save profile updates
  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedBio = input.bio.trim() === "" ? "No bio available" : input.bio;

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", updatedBio);
    formData.append("skills", input.skills);
    if (input.resume) {
      formData.append("file", input.resume);
    }

    try {
      const res = await axios.post(
       `${USER_API_END_POINT}/profile/update`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Profile updated successfully!");
        setTimeout(() => setOpen(false), 1500);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
}

  // Handle file upload
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (file && allowedTypes.includes(file.type)) {
      setInput({ ...input, resume: file });
      setFileError('');
    } else {
      setFileError('Please select a valid file (PDF, DOC, DOCX)');
      setInput({ ...input, resume: null });
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Update Profile</DialogTitle>
      <DialogContent>
        <TextField label="Full Name" fullWidth value={input.fullname}
          onChange={(e) => setInput({ ...input, fullname: e.target.value })}
          margin="normal"
        />

        <TextField label="Email" fullWidth value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          margin="normal"
        />

        <TextField label="Phone Number" fullWidth value={input.phoneNumber}
          onChange={(e) => setInput({ ...input, phoneNumber: e.target.value })}
          margin="normal"
        />

        <TextField label="Bio" fullWidth multiline rows={4} value={input.bio}
          onChange={(e) => setInput({ ...input, bio: e.target.value })}
          margin="normal"
        />

        <TextField label="Skills" fullWidth onKeyDown={changeEventHandler}
          margin="normal" placeholder="Press Enter to add skill"
        />
        

        <Box mt={3} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Upload Resume (PDF, DOC, DOCX)
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <input type="file" id="file-upload" style={{ display: 'none' }}
              onChange={handleFileChange} accept=".pdf,.doc,.docx"
            />
            <label htmlFor="file-upload">
              <Button variant="contained" component="span" color="primary">
                <AttachFileIcon />
                {input.resume ? input.resume.name : "Choose File"}
              </Button>
            </label>
          </Box>
          {fileError && <Typography variant="body2" color="error">{fileError}</Typography>}
          {input.resume && (
            <Box mt={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="body2" color="textPrimary">Selected file: {input.resume.name}</Typography>
              <Button variant="text" color="secondary" onClick={() => setInput({ ...input, resume: null })}>
                Remove Resume
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="secondary" variant="contained" sx={{ margin: '0 10px 16px 16px' }}>Cancel</Button>
        <Button sx={{ margin: '0 16px 16px 16px' }} onClick={handleSave}
          color="primary" variant="contained" disabled={loading}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
        <Toaster position="bottom-right" />
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProfileDialog;




// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Avatar, Box, Typography, CircularProgress } from '@mui/material';
// import axios from 'axios';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast, Toaster } from 'sonner';
// import { setUser } from '../redux/authSlice.js';
// import { USER_API_END_POINT } from '../utils/constant.js';

// const UpdateProfileDialog = ({ open, setOpen }) => {
//   const { user } = useSelector(store => store.auth);
//   const dispatch = useDispatch();

//   const [input, setInput] = useState({
//     fullname: user?.fullname || "",
//     email: user?.email || "",
//     phoneNumber: user?.phoneNumber || "",
//     bio: user?.profile?.bio || "",
//     skills: user?.profile?.skills?.map(skill => skill) || "",
//     resume: user?.profile?.resume || null,
//     profilePhoto: user?.profile?.profilePhoto || null
//   });



//   const [fileError, setFileError] = useState('');
//   const [loading, setLoading] = useState(false);


//   // Close dialog
//   const handleClose = () => setOpen(false);

//   // Save profile updates
//   const handleSave = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const updatedBio = input.bio.trim() === "" ? "No bio available" : input.bio;

//     const formData = new FormData();
//     formData.append("fullname", input.fullname);
//     formData.append("email", input.email);
//     formData.append("phoneNumber", input.phoneNumber);
//     formData.append("bio", updatedBio);
//     formData.append("skills", input.skills);
//     if (input.resume) {
//       formData.append("file", input.resume);
//     }
//     if (input.profilePhoto) { formData.append("profilePhoto", input.profilePhoto); }


//     try {
//       const res = await axios.post(
//         `${USER_API_END_POINT}/profile/update`,
//         formData,
//         { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
//       );

//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         toast.success("Profile updated successfully!");
//         setTimeout(() => setOpen(false), 1500);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       toast.error(error.response?.data?.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   }

//   // Handle file upload
//   const handleFileChange = (event) => {
//     const file = event.target.files?.[0];
//     const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

//     if (file && allowedTypes.includes(file.type)) {
//       setInput({ ...input, resume: file });
//       setFileError('');
//     } else {
//       setFileError('Please select a valid file (PDF, DOC, DOCX)');
//       setInput({ ...input, resume: null });
//     }
//   };

//   const handleProfilePhotoChange = (event) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       setInput({ ...input, profilePhoto: file });
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose}>
//       <DialogTitle>Update Profile</DialogTitle>
//       <DialogContent>
//         <Box display="flex" alignItems="center" flexDirection="column" mb={2}>
//           <Avatar src={user?.profile?.profilePhoto} sx={{ width: 80, height: 80 }} />
//           <input
//             type="file"
//             id="profile-pic-upload"
//             style={{ display: 'none' }}
//             onChange={handleProfilePhotoChange}
//             accept="image/*"
//           />
//           <label htmlFor="profile-pic-upload">
//             <Button variant="contained" component="span" color="primary" sx={{ mt: 1 }}>
//               Change Profile Picture
//             </Button>
//           </label>
//         </Box>
//         <TextField label="Full Name" fullWidth value={input.fullname}
//           onChange={(e) => setInput({ ...input, fullname: e.target.value })}
//           margin="normal"
//         />

//         <TextField label="Email" fullWidth value={input.email}
//           onChange={(e) => setInput({ ...input, email: e.target.value })}
//           margin="normal"
//         />

//         <TextField label="Phone Number" fullWidth value={input.phoneNumber}
//           onChange={(e) => setInput({ ...input, phoneNumber: e.target.value })}
//           margin="normal"
//         />

//         <TextField label="Bio" fullWidth multiline rows={4} value={input.bio}
//           onChange={(e) => setInput({ ...input, bio: e.target.value })}
//           margin="normal"
//         />

//         <TextField label="Skills" fullWidth onKeyDown={changeEventHandler}
//           margin="normal" placeholder="Press Enter to add skill"
//         />


//         <Box mt={3} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
//           <Typography variant="body2" color="textSecondary">
//             Upload Resume (PDF, DOC, DOCX)
//           </Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <input type="file" id="file-upload" style={{ display: 'none' }}
//               onChange={handleFileChange} accept=".pdf,.doc,.docx"
//             />
//             <label htmlFor="file-upload">
//               <Button variant="contained" component="span" color="primary">
//                 <AttachFileIcon />
//                 {input.resume ? input.resume.name : "Choose File"}
//               </Button>
//             </label>
//           </Box>
//           {fileError && <Typography variant="body2" color="error">{fileError}</Typography>}
//           {input.resume && (
//             <Box mt={2} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Typography variant="body2" color="textPrimary">Selected file: {input.resume.name}</Typography>
//               <Button variant="text" color="secondary" onClick={() => setInput({ ...input, resume: null })}>
//                 Remove Resume
//               </Button>
//             </Box>
//           )}
//         </Box>
//       </DialogContent>

//       <DialogActions>
//         <Button onClick={handleClose} color="secondary" variant="contained" sx={{ margin: '0 10px 16px 16px' }}>Cancel</Button>
//         <Button sx={{ margin: '0 16px 16px 16px' }} onClick={handleSave}
//           color="primary" variant="contained" disabled={loading}
//           startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
//         >
//           {loading ? "Saving..." : "Save"}
//         </Button>
//         <Toaster position="bottom-right" />
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default UpdateProfileDialog;