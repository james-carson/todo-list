// Index.js is the main page which runs functions at the highest levels, including running initialisation
// ...functions and loading the CSS

import { setDemoData } from './demo-data.js'
import { loadData } from './storage';
import { renderSidebar, updateScreen } from './ui.js';
import './styles.css';

// This function runs on startup to set the app up.
function initialiseApp() {
    // Add event listener for DOM loaded
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM Content loaded, initialising initialiseApp()');
        // Demo data is set - These projects can be removed by the user if desired
        setDemoData();
        // Render the sidebar with all static and dynamic projects
        renderSidebar();
        // Render the rest of the content.
        updateScreen();
        console.log('App initialised')
    })
};

// Run the function immediately
initialiseApp();