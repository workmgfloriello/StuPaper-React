import { HomepageInfoCourse } from "@/components/HomepageInfoCourse";
import Sidebar from "@/components/Sidebar";
import { useCourses } from "@/lib/context/CoursesContext";
import { useParams } from "react-router-dom";

export function CourseInfoPage() {
  const { corsoId } = useParams();
  const { courses } = useCourses();

  //trova Corso
  const foundCourse = courses.find((course) => course.id === corsoId);

  if (!foundCourse) {
    return null;
  }

  return (
    <div className="flex h-full w-full overflow-hidden">
      <Sidebar />

      <main className="min-w-0 flex-1 overflow-y-auto">
        <HomepageInfoCourse course={foundCourse} />
      </main>
    </div>
  );
}
