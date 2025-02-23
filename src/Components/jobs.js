import Link from 'next/link';
import React, { useContext } from 'react';
import { Skills } from './Hooks/Global/jobs';

const JobsCard = ({ jobs }) => {
    const { title, company, location, salary, id, requiredSkills } = jobs || {};
    const { skillsFromStorage } = useContext(Skills) || { skillsFromStorage: [] };

    const matchedSkill = requiredSkills.filter(skill => skillsFromStorage.includes(skill));

    const percentage = requiredSkills.length > 0 ? (matchedSkill.length / requiredSkills.length) * 100 : 0;

    return (
        <Link href={`detail/${id}`}>
            <div className='bg-gray-50 mt-3 p-4 text-gray-800 rounded-sm'>
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

                {/* Display percentage */}
                <p className="text-sm mt-2">
                    Match: {percentage.toFixed(2)}%
                </p>

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
