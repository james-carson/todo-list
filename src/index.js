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
        // For now, set the demo Data - later, when there is demo mode, ask which dataset should be used
        setDemoData();
        renderSidebar();
        // console.log('Demo Data set within initialiseApp()');
        updateScreen('default', '', []);
        // console.log('updateScreen() ran within initialiseApp() with loadDefaultView()');
        // console.log('App initialised')
    })
};

initialiseApp();