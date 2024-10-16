"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { CiMenuBurger } from "react-icons/ci";
import { SlWrench } from "react-icons/sl";
import { CiCalendar } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { CiStickyNote } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import styles from "./todohome.module.css";

const Todohome = () => {
  const router = useRouter();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const [tasks, setTasks] = useState<string[]>([]); 
  const [newTask, setNewTask] = useState<string>("");

 
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
    } else if (section === "timer") {
      router.push("/timer");
    } else if (section === "notes") {
      router.push("/notes");
    }
  };


  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask(""); 
    }
  };

 
  const handleEditTask = (index: number) => {
    const updatedTask = prompt("Edit task:", tasks[index]);
    if (updatedTask !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = updatedTask;
      setTasks(updatedTasks);
    }
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className={styles.main_container}>
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
              isSidebarVisible && selectedSection === "To do"
                ? styles.selected
                : ""
            }`}
            onClick={() => handleSectionClick("To do")}
          >
            <SlWrench />
            {isSidebarVisible && (
              <span className={styles.icon_name}>To do</span>
            )}
          </div>
          <div
            className={`${styles.icon_item} ${
              isSidebarVisible && selectedSection === "Calendar"
                ? styles.selected
                : ""
            }`}
            onClick={() => handleSectionClick("Calendar")} 
          >
            <CiCalendar />
            {isSidebarVisible && (
              <span className={styles.icon_name}>Calendar</span>
            )}
          </div>

          <div
            className={`${styles.icon_item} ${
              isSidebarVisible && selectedSection === "timer"
                ? styles.selected
                : ""
            }`}
            onClick={() => handleSectionClick("timer")}
          >
            <CiTimer />
            {isSidebarVisible && (
              <span className={styles.icon_name}>Timer</span>
            )}
          </div>
          <div
            className={`${styles.icon_item} ${
              isSidebarVisible && selectedSection === "notes"
                ? styles.selected
                : ""
            }`}
            onClick={() => handleSectionClick("notes")}
          >
            <CiStickyNote />
            {isSidebarVisible && (
              <span className={styles.icon_name}>Notes</span>
            )}
          </div>
        </div>
      </div>

      
      <div className={styles.task_container}>
        <h2 className={styles.task_topic}>Tasks to do</h2>
        <div className={styles.task_header}>
          <input
            type="text"
            placeholder="New task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className={styles.task_input}
          />
          <AiOutlinePlus onClick={handleAddTask} className={styles.add_icon} />
        </div>

        
        <table className={styles.task_table}>
          <thead>
            <tr>
              <th>Task Name</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{task}</td>
                <td>
                  <FaEdit
                    onClick={() => handleEditTask(index)}
                    className={styles.edit_icon}
                  />
                </td>
                <td>
                  <FaTrashAlt
                    onClick={() => handleDeleteTask(index)}
                    className={styles.delete_icon}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Todohome;
