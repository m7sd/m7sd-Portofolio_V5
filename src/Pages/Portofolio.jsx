import React, { useEffect, useState, useCallback } from "react";

import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import TechStackIcon from "../components/TechStackIcon";

import AOS from "aos";
import "aos/dist/aos.css";
import { Code, Award, Boxes, Github, ExternalLink } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  STATIC DATA – YOUR PROJECTS, CERTS                                */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    id: 1,
    Title: "Hospital System Data (C++)",
    Description:
      "Console-based hospital management system written in C++ to handle patient data, doctors, and appointments.",
    Link: "https://github.com/m7sd/HospitalSystemData",
    Github: "https://github.com/m7sd/HospitalSystemData",
    TechStack: ["C++", "OOP", "Data Structures"],
  },
  {
    id: 2,
    Title: "ATS Project (C++)",
    Description:
      "Applicant Tracking System in C++ that stores, filters, and manages job applications through a menu-driven console UI.",
    Link: "https://github.com/m7sd/ATS_Project",
    Github: "https://github.com/m7sd/ATS_Project",
    TechStack: ["C++", "File Handling"],
  },
  {
    id: 3,
    Title: "Face Recognition (Python)",
    Description:
      "Face recognition project using Python and OpenCV to detect and recognize faces from the webcam in real time.",
    Link: "https://github.com/m7sd/FaceRecognetionPython",
    Github: "https://github.com/m7sd/FaceRecognetionPython",
    TechStack: ["Python", "OpenCV", "Computer Vision"],
  },
  {
    id: 4,
    Title: "OWSB System (Java)",
    Description:
      "Java system (OWSB) focused on clean object-oriented design and modular structure for managing different operations.",
    Link: "https://github.com/m7sd/OWSB_System_msd",
    Github: "https://github.com/m7sd/OWSB_System_msd",
    TechStack: ["Java", "OOP"],
  },
  {
    id: 5,
    Title: "Airport Simulation System (Java, Concurrency)",
    Description:
      "Java concurrency project that simulates airport operations such as flights and gates using threads and synchronization.",
    Link: "https://github.com/m7sd/AirportSimulationSystem",
    Github: "https://github.com/m7sd/AirportSimulationSystem",
    TechStack: ["Java", "Concurrency", "Threads"],
  },
  {
    id: 6,
    Title: "Chess Academy Website",
    Description:
      "Website built to teach chess concepts and present information about a chess academy for beginners and learners.",
    Link: "#",
    Github: "",
    TechStack: ["HTML", "CSS", "JavaScript"],
  },
];

/* ---------- YOUR CERTIFICATES (TEXT ONLY, NO IMAGES) ---------- */

const CERTIFICATES = [
  {
    id: 1,
    title: "Certificate of Participation – Internal CTF Workshop 2025",
    issuer:
      "Forensic & Cybersecurity Research Centre – Student Section (FSEC-SS), Asia Pacific University",
    date: "22 March 2025",
    focus:
      "Hands-on Capture The Flag workshop focusing on cybersecurity fundamentals, tools, and practical attacks/defences.",
  },
  {
    id: 2,
    title: "Red Hat System Administration I (RH124) – Attendance",
    issuer: "Red Hat",
    date: "24 April 2025",
    focus:
      "Linux fundamentals: user and group management, permissions, storage, and basic networking on Red Hat Enterprise Linux.",
  },
  {
    id: 3,
    title: "Red Hat System Administration II (RH134) – Attendance",
    issuer: "Red Hat",
    date: "12 October 2025",
    focus:
      "Advanced Linux administration: automation, services, network configuration, and troubleshooting on Red Hat Enterprise Linux.",
  },
  {
    id: 4,
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    date: "2024",
    focus:
      "Core cybersecurity concepts including threat types, attack vectors, security principles, and career paths in cyber.",
  },
];

/* ------------------------------------------------------------------ */
/*  SMALL COMPONENTS                                                  */
/* ------------------------------------------------------------------ */

const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline
          points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}
        ></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

/* ------------------------------------------------------------------ */
/*  MAIN COMPONENT                                                    */
/* ------------------------------------------------------------------ */

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);

  const isMobile = window.innerWidth < 768;
  const initialItems = isMobile ? 3 : 6;

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === "projects") {
      setShowAllProjects((prev) => !prev);
    } else {
      setShowAllCertificates((prev) => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects
    ? PROJECTS
    : PROJECTS.slice(0, initialItems);

  const displayedCertificates = showAllCertificates
    ? CERTIFICATES
    : CERTIFICATES.slice(0, initialItems);

  return (
    <div
      className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden"
      id="Portofolio"
    >
      {/* Header */}
      <div
        className="text-center pb-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span
            style={{
              color: "#6366f1",
              backgroundImage:
                "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Portfolio Showcase
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
          A collection of my projects, certifications, and core technical
          skills. This section reflects my journey as a Computer Science
          student, focusing on Linux, cybersecurity, networking, and
          programming.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* TABS */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="fullWidth"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 0",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-flexContainer": {
                gap: "8px",
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5" />}
              label="Projects"
              {...a11yProps(0)}
            />
            <Tab
              icon={<Award className="mb-2 w-5 h-5" />}
              label="Certificates"
              {...a11yProps(1)}
            />
            <Tab
              icon={<Boxes className="mb-2 w-5 h-5" />}
              label="Tech Stack"
              {...a11yProps(2)}
            />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          {/* PROJECTS TAB – TEXT ONLY CARDS */}
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={
                      index % 3 === 0
                        ? "fade-up-right"
                        : index % 3 === 1
                        ? "fade-up"
                        : "fade-up-left"
                    }
                    data-aos-duration={index % 3 === 1 ? "1200" : "1000"}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-3 hover:border-[#6366f1]/50 hover:bg:white/10 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {project.Title}
                    </h3>
                    <p className="text-sm text-slate-300">
                      {project.Description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.TechStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-[0.7rem] rounded-full bg-white/10 text-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-3 mt-3 text-sm">
                      {project.Link && project.Link !== "#" && (
                        <a
                          href={project.Link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-100"
                        >
                          <ExternalLink className="w-4 h-4" /> Live / Details
                        </a>
                      )}
                      {project.Github && (
                        <a
                          href={project.Github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-slate-300 hover:text-slate-100"
                        >
                          <Github className="w-4 h-4" /> GitHub
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {PROJECTS.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore("projects")}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          {/* CERTIFICATES TAB – TEXT CARDS, NO IMAGES */}
          <TabPanel value={value} index={1} dir={theme.direction}>
            {displayedCertificates.length === 0 ? (
              <div className="text-center text-slate-400 py-10">
                No certificates added yet.
              </div>
            ) : (
              <div className="container mx-auto flex justify-center items-center overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
                  {displayedCertificates.map((cert, index) => (
                    <div
                      key={cert.id || index}
                      data-aos={
                        index % 2 === 0 ? "fade-up-right" : "fade-up-left"
                      }
                      data-aos-duration="1000"
                      className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-2 hover:border-[#a855f7]/50 hover:bg-white/10 transition-all duration-300"
                    >
                      <h3 className="text-base md:text-lg font-semibold text-white">
                        {cert.title}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-300">
                        <span className="font-semibold">Issuer:</span>{" "}
                        {cert.issuer}
                      </p>
                      <p className="text-xs md:text-sm text-slate-400">
                        <span className="font-semibold">Date:</span>{" "}
                        {cert.date}
                      </p>
                      <p className="text-xs md:text-sm text-slate-300 mt-1">
                        {cert.focus}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {CERTIFICATES.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore("certificates")}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          {/* TECH STACK TAB – USE SINGLE GRID COMPONENT */}
          <TabPanel value={value} index={2} dir={theme.direction}>
            <div
              className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]"
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <TechStackIcon />
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
