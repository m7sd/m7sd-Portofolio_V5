import React from "react";

import javaIcon from "../assets/java.png";
import pythonIcon from "../assets/python.png";
import cIcon from "../assets/c.png";
import cppIcon from "../assets/cpp.png";
import sqlIcon from "../assets/sql.png";
import webIcon from "../assets/web.png";
import cssIcon from "../assets/css.png";
import assemblyIcon from "../assets/assembly.png";

const techStack = [
  { name: "Java", icon: javaIcon },
  { name: "Python", icon: pythonIcon },
  { name: "C Programming", icon: cIcon },
  { name: "C++", icon: cppIcon },
  { name: "SQL", icon: sqlIcon },
  { name: "Assembly", icon: assemblyIcon },
  { name: "CSS", icon: cssIcon },
  { name: "Web Development", icon: webIcon },
];

const TechStackIcon = () => {
  return (
    <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {techStack.map((item, index) => (
        <div
          key={index}
          className="bg-white/5 hover:bg-white/10 transition-all duration-300 rounded-2xl p-6 flex flex-col items-center justify-center border border-white/10"
        >
          <img
            src={item.icon}
            alt={item.name}
            className="w-16 h-16 object-contain mb-3"
          />
          <p className="text-gray-200 font-semibold text-center text-sm">
            {item.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default TechStackIcon;
