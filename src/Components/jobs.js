import Link from 'next/link';
import React, { useContext } from 'react';
import { Skills } from './Hooks/Global/jobs';

const JobsCard = ({ jobs }) => {
    const { title, company, location, salary, id, requiredSkills } = jobs || {};
    const { skillsFromStorage } = useContext(Skills) || { skillsFromStorage: [] };
    const matchedSkill = requiredSkills.filter(skill => skillsFromStorage.includes(skill));

    const percentage = requiredSkills.length > 0 ? (matchedSkill.length / requiredSkills.length) * 100 : 0;

    let progressBarColor = "bg-red-500"; 
    if (percentage >= 80) progressBarColor = "bg-green-500"; 
    else if (percentage >= 50) progressBarColor = "bg-yellow-500"; 

    return (
        <Link href={`detail/${id}`}>
            <div className='bg-gray-50 mt-3 p-4 text-gray-800 rounded-sm mb-4'>
                <div className='flex justify-between'>
                    <div className='mb-3'>
                        <h2>{title}</h2>
                        <p className='text-sm'>@{company}</p>
                    </div>
                    <div className='mt-3'>
                        <h2>{location}</h2>
                        <p className='text-sm'>{salary}</p>
                    </div>
                </div>

                <div className="mt-3">
                    <div className="w-[20rem] bg-gray-300 rounded-full h-2">
                        <div 
                            className={`h-2 rounded-full ${progressBarColor}`} 
                            style={{ width: `${percentage}%` }} 
                        ></div>
                    </div>
                    <p className="text-xs mt-1 text-gray-600">{percentage.toFixed(2)}% Match</p>
                </div>

                <div className='flex gap-2 mt-2'>
                    {requiredSkills?.map((sk, i) => (
                        <h2 className='bg-gray-300 p-1 text-[10px] rounded-md' key={i}>{sk}</h2>
                    ))}
                </div>
            </div>
        </Link>
    );
};

export default JobsCard;
