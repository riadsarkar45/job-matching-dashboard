'use client'
import axios from 'axios';
import React, { createContext, useEffect, useRef, useState } from 'react';

export const Skills = createContext(null);

const Skill = ({ children }) => {
  const [skillsFromStorage, setSkillsFromStorage] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const storedSkills = JSON.parse(localStorage.getItem("selectedSkills") || "[]");
    setSkillsFromStorage(storedSkills);

    axios.get('https://api.jsonbin.io/v3/b/67ba1017e41b4d34e4985332')
      .then(res => {
        setJobs(res.data.record);
      })
  }, []); 

  const handleSkills = () => {
    const storedSkills = JSON.parse(localStorage.getItem("selectedSkills") || "[]");
    
    return setSkillsFromStorage(storedSkills);;
  };

  const skills = { skillsFromStorage, jobs, handleSkills };

  return (
    <div>
      <Skills.Provider value={skills}>
        {children}
      </Skills.Provider>
    </div>
  );
};

export default Skill;
