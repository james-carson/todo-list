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
        // loadData() is redundant at the moment, but shouldn't be later
        loadData('projects');
        console.log('loadProjects ran inside initialiseApp()');
        // Load the default view: updateScreen()
        updateScreen();
        console.log('updateScreen ran within initialiseApp()');
        console.log('App initialised')
})};

// What else needs to go inside here? All Event Listeners?

initialiseApp();


//  ------------------------------------------------------------------------------------------------------



// import { saveData, loadData } from './storage.js';
// import { defaultProjects, initialiseData } from './data.js';
// import { attachEventListeners, appendProjectNames, loadDefaultView } from './ui.js'
// import './styles.css';

// initialiseData();

// // Event listener to append the Project Names:
// document.addEventListener('DOMContentLoaded', () => {
//     appendProjectNames();
//     attachEventListeners();
//     console.log(`appendProjectNames() and attachEventListeners() ran successfully after DOM Content Loaded`)
//     loadDefaultView();
//     console.log('Due This Week loaded as default');
// });