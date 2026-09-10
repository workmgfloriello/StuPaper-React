import { useCourses } from "@/lib/context/CoursesContext";
import { useEffect, useState } from "react";

export default function BottomBar({ fileMeta }: any) {
  const { courses } = useCourses();

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const findCourse = courses.find((course) => course.id == fileMeta?.course);

  return (
    <>
      <span>
        {fileMeta?.name} - {findCourse?.name}
      </span>
      <span>{time.toLocaleTimeString("it-IT", {
        day:"2-digit",
        month:"2-digit",
        year:"2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })}</span>
    </>
  );
}