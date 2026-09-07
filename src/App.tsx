import { BrowserRouter, Routes, Route } from "react-router-dom";

import { CoursesProvider } from "./lib/context/CoursesContex";
import { NotesProvider } from "./lib/context/NotesContext";

import Home from "./pages/Home";
import CorsiPage from "./pages/CorsiPage";
import AppuntiPage from "./pages/AppuntiPage";
import EditorPage from "./pages/EditorPage";

export default function App() {
  return (
    <CoursesProvider>
      <NotesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/corsi" element={<CorsiPage />} />
            <Route path="/appunti" element={<AppuntiPage />} />
            <Route path="/editor" element={<EditorPage />} />
          </Routes>
        </BrowserRouter>
      </NotesProvider>
    </CoursesProvider>
  );
}
