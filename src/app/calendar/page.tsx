"use client";
import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import styles from "./calendar.module.css"; 

const CalendarPage = () => {
  return (
    <div className={styles.calendarContainer}>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"} 
        buttonText={{
          today: 'Today', 
          month: 'Month', 
          week: 'Week', 
          day: 'Day'
        }}
      />
    </div>
  );
};

export default CalendarPage;
