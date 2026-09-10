import { HashRouter, Routes, Route } from "react-router-dom";

import { CoursesProvider } from "./lib/context/CoursesContext";
import { FilesProvider} from "./lib/context/NotesContext";

import Home from "./pages/Home";
import CorsiPage from "./pages/CorsiPage";
import AppuntiPage from "./pages/AppuntiPage";
import CreateAppuntiPage from "./pages/CreateAppuntiPage";

import RouteWatcher from "./RouteWatcher";
import FrameTopbar from "./FrameTopbar";
import Editor from "./editor/Editor";

export default function App() {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      {/* TOPBAR */}
      <FrameTopbar />

      {/* TUTTO LO SPAZIO SOTTO LA TOPBAR */}
      <div className="min-h-0 flex-1 overflow-hidden">
        <CoursesProvider>
          <FilesProvider>
            <HashRouter>
              <RouteWatcher />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/corsi" element={<CorsiPage />} />
                <Route path="/appunti" element={<AppuntiPage />} />
                <Route path="/newappunti" element={<CreateAppuntiPage />} />

                {/* Route editor */}
                <Route path="/editor/:fileName" element={<Editor />} />
              </Routes>
            </HashRouter>
          </FilesProvider>
        </CoursesProvider>
      </div>
    </div>
  );
}
