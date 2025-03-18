import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        filterCriteria: {}
    },
    reducers: {
        // Actions for basic job handling
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },

        // Updated Filter Criteria with Multiple Selection Support
        setFilterCriteria: (state, action) => {
            state.filterCriteria = { ...state.filterCriteria, ...action.payload };
        },

        // Optimized Filter Logic for Displaying Jobs
        filterJobs: (state) => {
            const { filterCriteria } = state;
            const filterKeys = Object.keys(filterCriteria);
            
            // If no filters are selected, show all jobs
            if (filterKeys.length === 0) {
                state.allJobs = [...state.allJobs];
                return;
            }

            // Filter logic
            const filteredJobs = state.allJobs.filter((job) => {
                return filterKeys.every((key) => {
                    const filterValue = filterCriteria[key];
                    if (!filterValue) return true; // Skip if filter is empty

                    if (Array.isArray(filterValue)) {
                        return filterValue.some((value) =>
                            job[key]?.toLowerCase().includes(value.toLowerCase())
                        );
                    }

                    return job[key]?.toLowerCase().includes(filterValue.toLowerCase());
                });
            });

            state.allJobs = filteredJobs;
        }
    }
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    setFilterCriteria,
    filterJobs
} = jobSlice.actions;

export default jobSlice.reducer;
