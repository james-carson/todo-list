// Index.js is the main page which runs functions at the highest levels, including running initialisation
// ...functions and loading the CSS

import { setDemoData } from './demo-data.js'
import { loadData } from './storage';
import './styles.css';

function initialiseApp() {
    // Add event listener for DOM loaded
    document.addEventListener('DOMContentLoaded', () => {
        // For now, set the demo Data - later, when there is demo mode, ask which dataset should be used
        setDemoData();
        // loadData() is redundant at the moment, but shouldn't be later
        loadData();
        // Load the default view: updateScreen()
        updateScreen();
        console.log('App initialised')
})};

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