// Save projects and todos to localStorage
export const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Just saved: ${data}`)
};

// Load projects and todos from localStorage
export const loadData = (key) => {
    const storedData = localStorage.getItem(key);
    console.log(`Just loaded: ${storedData}`);
    return storedData ? JSON.parse(storedData) : null;
};

// window.saveData = saveData;
// window.loadData = loadData;