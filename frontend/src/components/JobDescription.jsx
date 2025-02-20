import React from 'react';

const JobDescription = ({ 
  singleJob = {
    title: "Frontend Developer",
    position: 12,
    jobType: "Part Time",
    salary: "6 LPA"
  }, 
  isApplied, 
  applyJobHandler 
}) => {
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
            className={`px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 ${
              isApplied 
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
          Job Description
        </h2>
        
        <div className="mt-6 space-y-4">
          {[
            ['Role', 'Frontend Developer'],
            ['Location', 'Hyderabad'],
            ['Description', 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab!'],
            ['Experience', '2 yrs'],
            ['Salary', '12LPA'],
            ['Total Applicants', '4'],
            ['Posted Date', '17-07-2024']
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