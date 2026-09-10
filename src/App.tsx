import { HashRouter, Routes, Route } from "react-router-dom";

import { CoursesProvider } from "./lib/context/CoursesContext";
import { NotesProvider } from "./lib/context/NotesContext";

import Home from "./pages/Home";
import CorsiPage from "./pages/CorsiPage";
import AppuntiPage from "./pages/AppuntiPage";
import EditorPage from "./pages/EditorPage";
import CreateAppuntiPage from "./pages/CreateAppuntiPage";

import RouteWatcher from "./RouteWatcher";
import FrameTopbar from "./FrameTopbar";

export default function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      {/* TOPBAR */}
      <FrameTopbar />

      {/* TUTTO LO SPAZIO SOTTO LA TOPBAR */}
      <div className="min-h-0 flex-1 overflow-hidden">
        <CoursesProvider>
          <NotesProvider>
            <HashRouter>
              <RouteWatcher />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/corsi" element={<CorsiPage />} />
                <Route path="/appunti" element={<AppuntiPage />} />
                <Route path="/newappunti" element={<CreateAppuntiPage />} />
                <Route path="/editor" element={<EditorPage />} />
              </Routes>
            </HashRouter>
          </NotesProvider>
        </CoursesProvider>
      </div>
    </div>
  );
}