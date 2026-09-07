import GrideBase from "../components/GrideBase";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <>
      <div className="flex h-screen w-full overflow-hidden">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <GrideBase />
        </main>
      </div>
    </>
  );
}
