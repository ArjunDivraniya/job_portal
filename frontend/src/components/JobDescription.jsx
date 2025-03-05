import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { setSingleJob } from '../redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast, Toaster } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });

      if (res.data.success) {
        setIsApplied(true); // Update the local state
        const updatedSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] }
        dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
        toast.success(res.data.message);

      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id)) // Ensure the state is in sync with fetched data
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-6xl mx-auto my-8 p-8 bg-white rounded-2xl shadow-lg">
      {/* Header Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-800">
            {singleJob?.title}
          </h1>
          <button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 ${isApplied
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-purple-600 hover:bg-purple-700'
              }`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </button>
        </div>

        {/* Badges Section */}
        <div className="flex flex-wrap gap-4">
          <div className="px-4 py-2 bg-blue-50 rounded-lg flex items-center gap-2">
            <span className="text-blue-600 font-semibold">Positions</span>
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded-full text-sm">
              {singleJob?.position || 12}
            </span>
          </div>

          <div className="px-4 py-2 bg-gray-50 rounded-lg flex items-center gap-2">
            <span className="text-gray-700 font-semibold">Job Type</span>
            <span className="bg-gray-600 text-white px-2 py-0.5 rounded-full text-sm">
              {singleJob?.jobType || "Part Time"}
            </span>
          </div>

          <div className="px-4 py-2 bg-purple-50 rounded-lg flex items-center gap-2">
            <span className="text-purple-600 font-semibold">Salary</span>
            <span className="bg-purple-600 text-white px-2 py-0.5 rounded-full text-sm">
              {singleJob?.salary || "6 LPA"}
            </span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 pb-4 border-b-2 border-gray-200">
        Job Description</h2>

        <div className="mt-6 space-y-4">
        {[ 
          ['Role', singleJob?.title],
          ['Location', singleJob?.location],
          ['Description', singleJob?.description],
          ['Experience', singleJob?.experience],
          ['Salary', singleJob?.salary],
          ['Total Applicants', singleJob?.applications?.length || '0'],
          ['Posted Date', singleJob?.createdAt?.split('T')[0] || 'N/A']
          ].map(([label, value], index) => (
            <div
              key={index}
              className="flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <dt className="w-48 font-semibold text-gray-700">{label}:</dt>
              <dd className="flex-1 text-gray-600">{value}</dd>
            </div>
          ))}
        </div>
      </div>


    </div>
  );
};

export default JobDescription;