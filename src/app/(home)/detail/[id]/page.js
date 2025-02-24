'use client';
import { Skills } from '@/Components/Hooks/Global/jobs';
import Loader from '@/Components/Hooks/Loader';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react';

const JobDetail = () => {
    const { jobs, skillsFromStorage, handleSkills } = useContext(Skills);
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        const storedSkills = JSON.parse(localStorage.getItem("selectedSkills") || "[]");
        setSelectedSkills(storedSkills);
    }, []);

    console.log(skillsFromStorage);

    const handleAddNewSkills = (skill) => {
        setSelectedSkills((prev) => {
            const updatedSkills = prev.includes(skill)
                ? prev.filter(s => s !== skill)
                : [...prev, skill];

            localStorage.setItem("selectedSkills", JSON.stringify(updatedSkills));

            handleSkills();
            return updatedSkills;
        });
    };

    useEffect(() => {
        if (jobs && id) {
            const findJob = jobs.find((job) => job.id === Number(id));
            setJob(findJob || null);
        }
    }, [jobs, id]);

    if (job === null) {
        return <Loader />;
    }

    const matchedSkill = [];
    const unMatchedSkill = [];
    job.requiredSkills.forEach(skill => {
        if (skillsFromStorage.includes(skill)) {
            matchedSkill.push(skill);
        } else {
            unMatchedSkill.push(skill);
        }
    });

    

    setInterval(() => {
        if (isApplied) return setIsApplied(false)
    }, 6000);

    return (
        <div className='bg-gray-50 lg:w-[60rem] p-4 rounded-md text-gray-800'>

            <div>
                <div className='flex gap-4 items-center justify-between mb-7'>
                    <div className="block sm:hidden">
                        <Link href='/'>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 19L8 12L15 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>

                    <h2 className='text-[1.2rem]'>{job.company}</h2>
                    <button onClick={() => setIsApplied(true)} className='bg-blue-200 p-2 rounded-sm text-gray-800'>Apply</button>
                </div>
                {
                    isApplied ? (
                        <div className='bg-green-500 mb-6 p-3 rounded-md border bg-opacity-10 border-green-400 text-green-900'>
                            <h2>Thank you for applying</h2>
                        </div>
                    ) : null
                }
                <p className='text-[1.5rem] mb-3'>{job.title}</p>
                <div className='flex gap-9 items-center'>
                    <p className='text-sm'>{job.location}</p>
                    <p onClick={() => setIsOpen(true)} className="bg-gray-200 mt-2 p-1 rounded-md text-sm">
                        {unMatchedSkill?.length < 1
                            ? `High Skill Match`
                            : `${matchedSkill.length} matched and ${unMatchedSkill.length} unmatched skills`}
                    </p>
                </div>
                <p>{job.salary}</p>

                <div className='mt-10'>
                    <p>{job.jobDescription}</p>
                </div>
                <div className='mt-8'>
                    <h2 className='mb-5'>Required Skills</h2>
                    {job?.requiredSkills?.map((sk, i) => <li key={i}>{sk}</li>)}
                </div>
            </div>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg lg:w-[50rem] max-h-[80vh] overflow-hidden">
                        <h2 className="text-lg font-semibold mb-4">Skills</h2>
                        <div className="grid lg:grid-cols-5 grid-cols-2 items-center justify-center gap-2 overflow-y-auto max-h-60">
                            {job?.requiredSkills?.map((skill, i) => (
                                <div
                                    key={i}
                                    className={`p-2 w-full rounded-md cursor-pointer ${selectedSkills.includes(skill) ? 'bg-blue-500 text-white' : 'bg-blue-200'}`}
                                    onClick={() => handleAddNewSkills(skill)}
                                >
                                    <h2 className='w-full'>{skill}</h2>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={() => setIsOpen(false)}
                            >
                                Ok
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobDetail;
