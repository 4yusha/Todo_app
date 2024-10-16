"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import styles from './timer.module.css'; 
import { BsPlay } from 'react-icons/bs'; 
import { BiArrowBack } from 'react-icons/bi'; 
import { CiMenuBurger, CiCalendar, CiTimer, CiStickyNote } from "react-icons/ci";
import { SlWrench } from "react-icons/sl";

function PomodoroTimer() {
    const router = useRouter();
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [selectedSection, setSelectedSection] = useState("");
    const [workMinutes, setWorkMinutes] = useState(25); 
    const [breakMinutes, setBreakMinutes] = useState(5); 
    const [minutes, setMinutes] = useState(25); 
    const [seconds, setSeconds] = useState(0);  
    const [isWorkTime, setIsWorkTime] = useState(true); 
    const [timerInterval, setTimerInterval] = useState<number | null>(null);

    
    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
        if (!isSidebarVisible) {
            setSelectedSection("");
        }
    };

  
    const handleSectionClick = (section: string) => {
        setSelectedSection(section);
        if (section === "To do") {
            router.push("/todohome");
        } else if (section === "Calendar") {
            router.push("/calendar");
        } else if (section === "Timer") {
            router.push("/timer");
        } else if (section === "Notes") {
            router.push("/notes");
        }
    };


    const handleWorkTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWorkMinutes(Number(event.target.value)); 
        setMinutes(Number(event.target.value)); 
    };

    const handleBreakTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBreakMinutes(Number(event.target.value)); 
    };

    // Start Timer
    const startTimer = () => {
        let currentMinutes = isWorkTime ? workMinutes - 1 : breakMinutes - 1;
        let initialSeconds = 59; 
        let breakCount = 0;

        const timerFunction = () => {
            initialSeconds--;

            if (initialSeconds < 0) {
                currentMinutes--;
                initialSeconds = 59;
            }

            if (currentMinutes < 0) {
                if (breakCount % 2 === 0) {
                    setIsWorkTime(false);
                    currentMinutes = breakMinutes - 1;
                    breakCount++;
                } else {
                    setIsWorkTime(true);
                    currentMinutes = workMinutes - 1;
                    breakCount++;
                }
            }

            if (breakCount === 2) {
                if (timerInterval !== null) {
                    clearInterval(timerInterval);
                }
            }

            setMinutes(currentMinutes);
            setSeconds(initialSeconds);
        };

        const intervalId = window.setInterval(timerFunction, 1000); 
        setTimerInterval(intervalId);
    };

    
    const resetTimer = () => {
        if (timerInterval !== null) {
            clearInterval(timerInterval);
        }
        setMinutes(workMinutes);
        setSeconds(0);
        setIsWorkTime(true);
    };


    const handleStartClick = () => {
        resetTimer();
        startTimer();
    };

    
    useEffect(() => {
        return () => {
            if (timerInterval !== null) {
                clearInterval(timerInterval);
            }
        };
    }, [timerInterval]);

    return (
        <div className={styles.main_container}>
            {/* Sidebar */}
            <div
                className={
                    isSidebarVisible
                        ? `${styles.vertical_line_container} ${styles.vertical_line_expanded}`
                        : styles.vertical_line_container
                }
            >
                <div className={styles.Menu} onClick={toggleSidebar}>
                    <CiMenuBurger />
                    {isSidebarVisible && <span className={styles.Menus}>Menu</span>}
                </div>

                <div className={styles.icon_container}>
                    <div
                        className={`${styles.icon_item} ${
                            isSidebarVisible && selectedSection === "To do" ? styles.selected : ""
                        }`}
                        onClick={() => handleSectionClick("To do")}
                    >
                        <SlWrench />
                        {isSidebarVisible && <span className={styles.icon_name}>To do</span>}
                    </div>
                    <div
                        className={`${styles.icon_item} ${
                            isSidebarVisible && selectedSection === "Calendar" ? styles.selected : ""
                        }`}
                        onClick={() => handleSectionClick("Calendar")}
                    >
                        <CiCalendar />
                        {isSidebarVisible && <span className={styles.icon_name}>Calendar</span>}
                    </div>
                    <div
                        className={`${styles.icon_item} ${
                            isSidebarVisible && selectedSection === "Timer" ? styles.selected : ""
                        }`}
                        onClick={() => handleSectionClick("Timer")}
                    >
                        <CiTimer />
                        {isSidebarVisible && <span className={styles.icon_name}>Timer</span>}
                    </div>
                    <div
                        className={`${styles.icon_item} ${
                            isSidebarVisible && selectedSection === "Notes" ? styles.selected : ""
                        }`}
                        onClick={() => handleSectionClick("Notes")}
                    >
                        <CiStickyNote />
                        {isSidebarVisible && <span className={styles.icon_name}>Notes</span>}
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <h1 className={styles.heading}><u>Timer</u></h1>

                <div className={styles.inputs}>
                    <div className={styles.inputGroup}>
                        <label>Work Minutes: </label>
                        <input
                            type="number"
                            min="1"
                            value={workMinutes}
                            onChange={handleWorkTimeChange}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Break Minutes: </label>
                        <input
                            type="number"
                            min="1"
                            value={breakMinutes}
                            onChange={handleBreakTimeChange}
                            className={styles.input}
                        />
                    </div>
                </div>

                <div className={styles.painel}>
                    <p className={styles.paragraph}>Work</p>
                    <p className={styles.paragraph}>Break</p>
                </div>

                <div className={styles.timer}>
                    <div className={styles.circle}>
                        <div className={styles.time}>
                            <p className={styles.minutes}>{minutes < 10 ? `0${minutes}` : minutes}</p>
                            <p>:</p>
                            <p className={styles.seconds}>{seconds < 10 ? `0${seconds}` : seconds}</p>
                        </div>
                    </div>
                </div>

                <div className={styles.controls}>
                    <button className={styles.start} onClick={handleStartClick}>
                        <BsPlay size={30} className={styles.icon} />
                    </button>

                    <button className={styles.reset} onClick={resetTimer}>
                        <BiArrowBack size={30} className={styles.icon} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PomodoroTimer;
