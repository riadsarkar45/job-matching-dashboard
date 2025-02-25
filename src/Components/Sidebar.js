'use client';
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { Skills } from "./Hooks/Global/jobs";
import Link from "next/link";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const hasFetched = useRef(false);
    const [skills, setSkills] = useState([]);  // Skills fetched from API
    const [selectedSkills, setSelectedSkills] = useState([]);
    const { handleSkills } = useContext(Skills);

    useEffect(() => {
        const storedSkills = JSON.parse(localStorage.getItem("selectedSkills") || "[]");
        setSelectedSkills(storedSkills);
    }, []);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        axios.get('https://api.jsonbin.io/v3/b/67ba0ebdad19ca34f80e0b3b')
            .then(res => {
                setSkills(res.data.record);
                console.log(res.data.record);
            });
    }, []);

    const handleAddNewSkills = (skill) => {
        setSelectedSkills((prev) => {
            let updatedSkills;
            if (prev.includes(skill)) {
                updatedSkills = prev.filter(s => s !== skill);
            } else {
                updatedSkills = [...prev, skill];
            }
            localStorage.setItem("selectedSkills", JSON.stringify(updatedSkills));
            return updatedSkills;
        });
        handleSkills();
    };

    return (
        <div className="lg:flex">
            <div className="fixed top-0 left-0 lg:w-[18rem] h-screen bg-slate-50 p-2 overflow-y-hidden lg:block hidden">
                <div className="mb-4 cursor-pointer flex gap-2 items-center text-lg">
                    
                    <Link href='/'>
                        <h2>Dashboard</h2>
                    </Link>
                </div>
                <div className="mb-3 mt-6 cursor-pointer flex gap-2 items-center">
                    
                    <Link href='/'>
                        <h2>Jobs</h2>
                    </Link>


                </div>
                <hr className="border-t border-b-gray-100" />
                <hr className="border-t border-b-gray-100" />
                <div className="mb-3 mt-2 cursor-pointer flex gap-2 items-center">
                    

                    <h2 onClick={() => setIsOpen(true)}>Add New Skills</h2>
                </div>
            </div>


            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[50rem] max-h-[80vh] overflow-hidden">
                        <h2 className="text-lg font-semibold mb-4">Add New Skill</h2>

                        <div className="grid grid-cols-5 items-center justify-center gap-2 overflow-y-auto max-h-60">
                            {skills?.map((skill, i) => (
                                <div
                                    key={i}
                                    className={`p-2 rounded-md cursor-pointer ${selectedSkills.includes(skill) ? 'bg-blue-500 text-white' : 'bg-blue-200'}`}
                                    onClick={() => handleAddNewSkills(skill)}
                                >
                                    <h2>{skill}</h2>
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

export default Sidebar;
