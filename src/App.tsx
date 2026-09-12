import { HashRouter, Routes, Route } from "react-router-dom";

import { CoursesProvider } from "./lib/context/CoursesContext";
import { FilesProvider } from "./lib/context/NotesContext";

import Home from "./pages/Home";
import CorsiPage from "./pages/CorsiPage";
import AppuntiPage from "./pages/AppuntiPage";
import CreateAppuntiPage from "./pages/CreateAppuntiPage";

import RouteWatcher from "./RouteWatcher";
import FrameTopbar from "./FrameTopbar";
import { ThemeProvider } from "./lib/context/ThemeContext";
import EditorPage from "./pages/EditorPage";
import { CourseInfoPage } from "./pages/CourseInfoPage";

export default function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      {/* TOPBAR */}
      <FrameTopbar />

      {/* TUTTO LO SPAZIO SOTTO LA TOPBAR */}
      <div className="min-h-0 flex-1 overflow-hidden">
        <CoursesProvider>
          <FilesProvider>
            <ThemeProvider>
              <HashRouter>
                <RouteWatcher />

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/corsi" element={<CorsiPage />} />
                  <Route path="/appunti/:appuntiFilter" element={<AppuntiPage />} />
                  <Route path="/newappunti" element={<CreateAppuntiPage />} />
                  <Route path="/corsi/:corsoId" element={<CourseInfoPage />}/>
                  {/* Route editor */}
                  <Route path="/editor/:fileName" element={<EditorPage />} />
                </Routes>
              </HashRouter>
            </ThemeProvider>
          </FilesProvider>
        </CoursesProvider>
      </div>
    </div>
  );
}
