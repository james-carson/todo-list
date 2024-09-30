import { Projects } from './projects';

// Save projects and todos to localStorage
export const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Just saved: ${data}`)
};

// Load projects and todos from localStorage, including rehydrating them so that their methods can be used:
export function loadData() {
    const data = JSON.parse(localStorage.getItem('projects')) || [];
    // Rehydrating them!
    return data.map(project => new Projects(project.name, project.todos));
}
