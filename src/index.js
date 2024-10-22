// Index.js is the main page which runs functions at the highest levels, including running initialisation
// ...functions and loading the CSS

import { setDemoData } from './demo-data.js'
import { loadData } from './storage';
import { renderSidebar, updateScreen } from './ui.js';
import './styles.css';

function initialiseApp() {
    // Add event listener for DOM loaded
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM Content loaded, initialising initialiseApp()');
        // Demo data is set - These projects can be removed if desired
        setDemoData();
        renderSidebar();
        updateScreen();
        console.log('App initialised')
    })
};

initialiseApp();