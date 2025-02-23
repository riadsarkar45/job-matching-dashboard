import React from 'react';

const JobsCard = ({ jobs }) => {
    const { title, company, location,salary } = jobs || {};
    return (
        <div className='bg-gray-50 mt-3 p-4 text-gray-800 rounded-sm flex justify-between'>
            <div className='mb-3'>
                <h2>{title}</h2>
                <p className='text-sm'>@{company}</p>
            </div>
            <div className='mt-3'>
                <h2>{location}</h2>
                <p className='text-sm'>{salary}</p>
            </div>
        </div>
    );
};

export default JobsCard;