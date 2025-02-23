'use client';
import JobsCard from '@/Components/jobs';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [jobs, setJobs] = useState([])
  
  const hasFetched = useRef(false);
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    axios.get('https://api.jsonbin.io/v3/b/67ba1017e41b4d34e4985332')
      .then(res => {
        console.log(res.data.record);
        setJobs(res.data.record);
      });
  }, []);
  // jobs?.map((job) => console.log(job, 'lll'))
  return (
    <div className='w-full'>
      <div className='grid grid-cols-3 mt-7'>
        <input className='w-[18rem] p-2 rounded-sm' type='text' placeholder='Job Title' />
        <input className='w-[18rem] p-2 rounded-sm' type='text' placeholder='Location' />
        <input className='w-[18rem] p-2 rounded-sm' type='text' placeholder='Company' />
      </div>
      {
        jobs?.map((jobs, i) => <JobsCard key={i} jobs={jobs} />)
      }

      
    </div>
  );
}
