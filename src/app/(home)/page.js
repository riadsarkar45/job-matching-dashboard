'use client';
import Loader from '@/Components/Hooks/Loader';
import JobsCard from '@/Components/jobs';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [jobs, setJobs] = useState([]); 
  const [allJobs, setAllJobs] = useState([]);
const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    axios.get('https://api.jsonbin.io/v3/b/67ba1017e41b4d34e4985332')
      .then(res => {
        setAllJobs(res.data.record); 
        setJobs(res.data.record); 
        setIsLoading(false)
      });
  }, []);

  const handleJobSearch = (e, type) => {
    if (type === 'jobTitle') {
      if (e === '') {
        setJobs(allJobs);
      } else {
        const jobTitle = allJobs.filter((job) => job.title.includes(e));
        setJobs(jobTitle);
      }
    }
    if (type === 'location') {
      if (e === 'Select Location') {
        setJobs(allJobs);
      } else {
        const jobTitle = allJobs.filter((job) => job.location.includes(e));
        setJobs(jobTitle);
      }
    }
    if (type === 'company') {
      if (e === 'Select Location') {
        setJobs(allJobs);
      } else {
        const jobTitle = allJobs.filter((job) => job.company.includes(e));
        setJobs(jobTitle);
      }
    }
    
  }

  if(isLoading) return <Loader/>

  return (
    <div className='w-full'>
      <div className='grid mb-7 grid-cols-3 mt-2 gap-2 bg-white p-3 rounded-md '>
        <input onChange={(e) => handleJobSearch(e.target.value, 'jobTitle')} className='lg:w-[18rem] outline-none border-2 border-gray-100 p-2 rounded-sm' type='text' placeholder='Job Title' />

        <select onChange={(e) => handleJobSearch(e.target.value, 'location')}   className='lg:w-[18rem] outline-none border-2 border-gray-100 p-2 rounded-sm' type='text' placeholder='Location'>
          <option defaultChecked>Select Location</option>
          <option>Remote</option>
          <option>Hybrid</option>
          <option>On-site</option>
        </select>
        <input onChange={(e) => handleJobSearch(e.target.value, 'company')} className='lg:w-[18rem] outline-none border-2 border-gray-100 p-2 rounded-sm' type='text' placeholder='Company Name' />
      </div>
      {
        jobs?.map((job, i) => <JobsCard key={i} jobs={job} />)
      }
    </div>
  );
}
