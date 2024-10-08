// Index.js is the main page which runs functions at the highest levels, including running initialisation
// ...functions and loading the CSS

import { setDemoData } from './demo-data.js'
import { loadData } from './storage';
import { updateScreen } from './ui.js';
import './styles.css';

function initialiseApp() {
    // Add event listener for DOM loaded
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOM Content loaded, initialising initialiseApp()');
        // For now, set the demo Data - later, when there is demo mode, ask which dataset should be used
        setDemoData();
        console.log('Demo Data set within initialiseApp()');
        // Load the default view: updateScreen()
        // loadData is used in getAllTodos(), which is always ran when rendering, so shouldn't be needed here.
        updateScreen('', '', '', 'default');
        console.log('updateScreen ran within initialiseApp()');
        console.log('App initialised')
})};

initialiseApp();