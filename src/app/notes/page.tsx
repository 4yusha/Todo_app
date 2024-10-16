"use client";

import { useState } from "react";
import styles from "./notes.module.css";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiMenuBurger } from "react-icons/ci";
import { SlWrench } from "react-icons/sl";
import { CiCalendar, CiTimer, CiStickyNote } from "react-icons/ci";
import { useRouter } from "next/navigation";

interface Note {
    text: string;
    date: string;
}

const NotesPage = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [newNote, setNewNote] = useState<string>("");
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [selectedSection, setSelectedSection] = useState<string>("");
    const router = useRouter();

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

    const addNote = () => {
        if (newNote.trim()) {
            const date = new Date().toLocaleDateString();
            const newNoteObj: Note = { text: newNote, date };
            setNotes([...notes, newNoteObj]);
            setNewNote("");
        }
    };

    const deleteNote = (index: number) => {
        const updatedNotes = notes.filter((_, i) => i !== index);
        setNotes(updatedNotes);
    };

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

            {/* Notes Content */}
            <div className={styles.note_content}>
                <h2 className={styles.note_topic}>Add a note</h2>

                <div className={styles.note_input_section}>
                    <input
                        type="text"
                        placeholder="New note"
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        className={styles.note_input}
                    />
                    <FaPlus onClick={addNote} className={styles.add_icon} />
                </div>

                <div className={styles.notes_container}>
                    {notes.map((note, index) => (
                        <div key={index} className={styles.note}>
                            <div className={styles.text}>{note.text}</div>
                            <div className={styles.footer}>
                                <div className={styles.date}>{note.date}</div>
                                <button className={styles.btn} onClick={() => deleteNote(index)}>
                                    <MdDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotesPage;
