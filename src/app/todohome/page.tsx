"use client"; // This is necessary to ensure this file runs as a client component

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import the new useRouter hook for App Router
import { CiMenuBurger } from "react-icons/ci";
import { SlWrench } from "react-icons/sl";
import { CiCalendar } from "react-icons/ci";
import { CiTimer } from "react-icons/ci";
import { CiStickyNote } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai"; // Plus icon
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Edit and Delete icons

import styles from "./todohome.module.css";

const Todohome = () => {
  const router = useRouter(); // Initialize the router
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const [tasks, setTasks] = useState<string[]>([]); // Initialize with an empty array
  const [newTask, setNewTask] = useState<string>("");

  // Toggle function to show or hide the sidebar
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    if (!isSidebarVisible) {
      setSelectedSection("");
    }
  };

  // Handler to set the selected section
  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
    if (section === "calendar") {
      router.push("/calendar"); // Navigate to the calendar page when clicked
    }
  };

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, newTask]);
      setNewTask(""); // Clear input
    }
  };

  // Handle editing a task
  const handleEditTask = (index: number) => {
    const updatedTask = prompt("Edit task:", tasks[index]);
    if (updatedTask !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[index] = updatedTask;
      setTasks(updatedTasks);
    }
  };

  // Handle deleting a task
  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className={styles.main_container}>
      <div
        className={`${styles.vertical_line_container} ${
          isSidebarVisible ? styles.vertical_line_expanded : ""
        }`}
      >
        <div className={styles.Menu} onClick={toggleSidebar}>
          <CiMenuBurger />
          {isSidebarVisible && <span className={styles.Menus}>Menu</span>}
        </div>

        <div className={styles.icon_container}>
          {/* Sidebar Icons */}
          <div
            className={`${styles.icon_item} ${
              isSidebarVisible && selectedSection === "todo"
                ? styles.selected
                : ""
            }`}
            onClick={() => handleSectionClick("todo")}
          >
            <SlWrench />
            {isSidebarVisible && (
              <span className={styles.icon_name}>To do</span>
            )}
          </div>
          <div
            className={`${styles.icon_item} ${
              isSidebarVisible && selectedSection === "calendar"
                ? styles.selected
                : ""
            }`}
            onClick={() => handleSectionClick("/calendar")}
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

      {/* Task list */}
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

        {/* Updated Table Layout without Status Column */}
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
