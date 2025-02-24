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
            {/* Sidebar: hidden on small screens, visible on large */}
            <div className="fixed top-0 left-0 lg:w-[18rem] h-screen bg-slate-50 p-2 overflow-y-hidden lg:block hidden">
                <div className="mb-4 cursor-pointer flex gap-2 items-center text-lg">
                    <svg
                        className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 21"
                    >
                        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                    </svg>
                    <h2>Dashboard</h2>
                </div>
                <div className="mb-3 mt-6 cursor-pointer flex gap-2 items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path d="M14 2H10C8.9 2 8 2.9 8 4V6H5C3.9 6 3 6.9 3 8V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V8C21 6.9 20.1 6 19 6H16V4C16 2.9 15.1 2 14 2ZM10 4H14V6H10V4ZM19 19H5V8H19V19ZM7 10H17V12H7V10ZM7 14H14V16H7V14Z"></path>
                    </svg>
                    <Link href='/'>
                        <h2>Jobs</h2>
                    </Link>


                </div>
                <hr className="border-t border-b-gray-100" />
                <hr className="border-t border-b-gray-100" />
                <div className="mb-3 mt-2 cursor-pointer flex gap-2 items-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                    >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm1 8c-.83 0-1.5.67-1.5 1.5S11.17 18 12 18s1.5-.67 1.5-1.5S12.83 15 12 15z"></path>
                    </svg>

                    <h2 onClick={() => setIsOpen(true)}>Add New Skills</h2>
                </div>
            </div>

            {/* <>
                
                <aside
                    id="default-sidebar"
                    className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
                    aria-label="Sidebar"
                >
                    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                        <ul className="space-y-2 font-medium">
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    
                                    <span className="ms-3">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                >
                                    <svg
                                        className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 18 18"
                                    >
                                        <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                                    </svg>
                                    <span className="flex-1 ms-3 whitespace-nowrap">Kanban</span>
                                    <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                        Pro
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </aside>
            </> */}


            {/* Modal */}
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
