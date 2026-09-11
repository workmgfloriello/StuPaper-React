import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import FileManager from "./lib/manager/FileManager";

export default function RouteWatcher() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  //Chiud RIFERIEMNTI al file se esco dall'editor
  useEffect(() => {
    console.log("Da:", previousPath.current);
    console.log("A:", location.pathname);

    if (
      previousPath.current === "/editor" &&
      location.pathname !== "/editor"
    ) {
      FileManager.closeFile();
      console.log("🔥 SONO USCITO DA EDITOR");
    }

    previousPath.current = location.pathname;
  }, [location.pathname]);

  return null;
}