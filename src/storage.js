// Save projects and todos to localStorage
export const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Load projects and todos from localStorage
export const loadData = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
};
