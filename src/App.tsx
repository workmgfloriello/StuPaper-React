import { HashRouter, Routes, Route } from "react-router-dom";

import { CoursesProvider } from "./lib/context/CoursesContext";
import { NotesProvider } from "./lib/context/NotesContext";

import Home from "./pages/Home";
import CorsiPage from "./pages/CorsiPage";
import AppuntiPage from "./pages/AppuntiPage";
import EditorPage from "./pages/EditorPage";

export default function App() {
  return (
    <CoursesProvider>
      <NotesProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/corsi" element={<CorsiPage />} />
            <Route path="/appunti" element={<AppuntiPage />} />
            <Route path="/editor" element={<EditorPage />} />
          </Routes>
        </HashRouter>
      </NotesProvider>
    </CoursesProvider>
  );
}

