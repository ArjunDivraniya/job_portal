import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import ImageAvatars from './ui/avatar.jsx';
import EditIcon from '@mui/icons-material/Edit';
import MailIcon from '@mui/icons-material/Mail';
import { Button } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import Badge from '@mui/material/Badge';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog.jsx';

const skills = ["HTML", "CSS", "JavaScript", "Reactjs"];
const isResume = true;
function Profile() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Navbar />
            <div className="max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex justify-between">
                    <div className="flex items-center gap-4">
                        <ImageAvatars sx={{ height: 96, width: 96 }} />
                        <div>
                            <h1 className='font-medium text-xl'>Full Name</h1>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur expedita eum ipsum.</p>
                        </div>
                    </div>
                    <Button onClick={()=>{setOpen(true)}} className="text-right">
                        <EditIcon />
                    </Button>
                </div>
                <div className='flex items-center gap-3 my-2'>
                    <MailIcon />
                    <span>priyasha.yadav.cg@gmail.com</span>
                </div>
                <div className='flex items-center gap-3 my-2'>
                    <PhoneIcon />
                    <span>8733012811</span>
                </div>
                <div>
                    <div className="flex flex-wrap gap-3">
                    <h1 className='mt-1 font-semibold'>Skills</h1>
                        {skills.length !== 0 ? (
                            skills.map((item, index) => (
                                <Badge key={index} overlap="rectangular" color="default">
                                    <span className="bg-blue-500 text-white rounded-full py-1 px-4 text-sm">
                                        {item}
                                    </span>
                                </Badge>
                            ))
                        ) : (
                            <span>NA</span>
                        )}
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5"> 
                        {/* Replace <Label> with <label> */}
                        <label className='text-md font-bold mt-3'>Resume</label>
                        {
                            isResume ? <a target='_blank' href='#' className='text-blue-500 w-full hover:underline cursor-pointer'>Download</a> : <span>NA</span>
                        }
                    </div>
                </div>
            </div>
                    <div className="max-w-4xl mx-auto bg-white-2xl">
                        <h1 className='font-bold text-2xl'>Applied Jobs</h1>
                            {/*Application Table */}
                            <AppliedJobTable />
                    </div>
                    <UpdateProfileDialog open={open} setOpen={setOpen} />
        </>
    );
}

export default Profile;
