import GrideBase from "../components/GrideBase";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden">
      <Sidebar />

      <main className="min-w-0 min-h-0 h-full flex-1 overflow-y-auto">
        <GrideBase />
      </main>
    </div>
  );
}