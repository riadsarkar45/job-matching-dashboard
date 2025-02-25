'use client'
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Skills } from './Hooks/Global/jobs';

const JobsCard = ({ jobs }) => {
    const { title, company, location, salary, id, requiredSkills } = jobs || {};
    const { skillsFromStorage } = useContext(Skills) || { skillsFromStorage: [] };

    const matchedSkill = requiredSkills.filter(skill => skillsFromStorage.includes(skill));
    const percentage = requiredSkills.length > 0 ? (matchedSkill.length / requiredSkills.length) * 100 : 0;

    useEffect(() => {
        console.log("Percentage:", percentage);  // Debugging
    }, [percentage]);

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

                {/* Progress Bar (CSS-based) */}
                <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 relative overflow-hidden">
                        <div 
                            className="h-2.5 rounded-full transition-all duration-500 ease-in-out progress-bar"
                            style={{
                                width: `${percentage}%`,
                                backgroundColor: percentage >= 80 ? 'green' : percentage >= 50 ? 'yellow' : 'red',
                                minWidth: percentage > 0 ? '5%' : '0%',
                            }}
                        ></div>
                    </div>

                    {/* Percentage Text */}
                    <p className="text-xs mt-1 text-gray-600">{percentage.toFixed(2)}% Match</p>
                </div>

                {/* Required Skills */}
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
