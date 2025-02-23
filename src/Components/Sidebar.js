'use client';
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const hasFetched = useRef(false);
    const [skills, setSkills] = useState([])

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        axios.get('https://api.jsonbin.io/v3/b/67ba0ebdad19ca34f80e0b3b')
            .then(res => {
                console.log(res.data.record);
                setSkills(res.data.record);
            })
    }, [])

    const handleAddNewSkills = () => {
        
    }
    return (
        <div className="flex">
            <div className="w-[18rem] h-screen bg-slate-50 p-2 ">
                <div className="mb-4 cursor-pointer">
                    <h2>Dashboard</h2>
                </div>
                <hr className="border-t-2 border-red-500 my-2" />
                <div className="mb-3 mt-6 cursor-pointer">
                    <h2>Jobs</h2>
                </div>
                <hr className="border-t-2 border-b-gray-100" />

                <div className="mb-3 mt-2 cursor-pointer">
                    <h2>My Skills</h2>
                </div>

                <hr className="border-t-2 border-b-gray-100" />

                <div className="mb-3 mt-2 cursor-pointer">
                    <h2 onClick={() => setIsOpen(true)}>Add New Skills</h2>
                </div>

            </div>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-[50rem]">
                        <h2 className="text-lg font-semibold mb-4">Add New Skill</h2>

                        <div className="grid grid-cols-5 items-center gap-2 " >
                            {
                                skills?.map((skills, i) => 
                                    <div className="bg-blue-200 p-2 rounded-md" key={i}>
                                        <h2>{skills?.name}</h2>
                                    </div>
                                )
                            }
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded"
                                onClick={() => setIsOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                                onClick={() => setIsOpen(false)}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
