import CalendarDashboard from "./GrideComponents/CalendarDashboard";
import Deadlines from "./GrideComponents/Deadlines";
import LastNotes from "./GrideComponents/LastNotes";
import RecentCourses from "./GrideComponents/RecentCourses";
import Welcome from "./Welcome";

export default function GrideBase() {
  return (
    <div
      className="
    grid
    min-h-screen
    w-full
    grid-cols-1
    grid-rows-[160px_400px_300px_450px_450px]
    gap-4
    overflow-y-auto
    p-4

    lg:h-screen
    lg:grid-cols-4
    lg:grid-rows-[0.3fr_1fr_1fr]
    lg:overflow-hidden
  "
    >
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
