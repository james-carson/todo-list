// Index.js is the main page which runs functions at the highest levels, including running initialisation
// ...functions and loading the CSS

import { setDemoData } from "./demo-data.js";
import { renderSidebar, updateScreen } from "./ui.js";
import { saveState } from "./storage.js";
import "./styles.css";

// This function runs on startup to set the app up.
function initialiseApp() {
  // Add event listener for DOM loaded
  document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Content loaded, initialising initialiseApp()");
    checkStorage();
    console.log("App initialised");
  });
}

function checkStorage() {
  let dataCheck;
  const storedProjects = localStorage.getItem("projects");
  if (!storedProjects || storedProjects == null) {
    dataCheck = false;
  } else {
    dataCheck = true;
  }

  if (!dataCheck) {
    setDemoData();
  }

  saveState("state", "default");
  renderSidebar();
  updateScreen();
}

// Run the function immediately
initialiseApp();
