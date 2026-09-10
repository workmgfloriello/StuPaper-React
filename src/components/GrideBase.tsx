import CalendarDashboard from "./GrideComponents/CalendarDashboard";
import Deadlines from "./GrideComponents/Deadlines";
import LastNotes from "./GrideComponents/LastNotes";
import RecentCourses from "./GrideComponents/RecentCourses";
import Welcome from "./Welcome";

export default function GrideBase() {
  return (
    <div className="grid h-full min-h-0 w-full grid-cols-4 grid-rows-[100px_minmax(0,1fr)_minmax(0,1fr)] gap-4 overflow-hidden bg-gray-50 p-4 transition-colors dark:bg-[#181818]">
      {/* Welcome */}
      <div className="min-h-0 min-w-0 lg:col-span-4">
        <Welcome />
      </div>

      {/* Ultimi appunti */}
      <div className="min-h-0 min-w-0 lg:col-span-3">
        <LastNotes />
      </div>

      {/* Scadenze */}
      <div className="min-h-0 min-w-0 lg:col-span-1">
        <Deadlines />
      </div>

      {/* Calendario */}
      <div className="min-h-0 min-w-0 lg:col-span-1">
        <CalendarDashboard />
      </div>

      {/* Corsi recenti */}
      <div className="min-h-0 min-w-0 lg:col-span-3">
        <RecentCourses />
      </div>
    </div>
  );
}
