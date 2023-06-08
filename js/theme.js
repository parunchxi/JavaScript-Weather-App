// Change Theme
const changeTheme = document.getElementById('change_theme');

changeTheme.addEventListener('click', () => {
    if (document.body.className === 'dark-mode') {
        setLightMode();
    } else {
        setDarkMode();
    }
})

function setDarkMode() {
    document.body.classList.add('dark-mode');
    changeTheme.innerHTML = '<i class="ri-moon-fill"></i>';
    localStorage.setItem('theme', 'darkMode');
}

function setLightMode() {
    document.body.classList.remove('dark-mode');
    changeTheme.innerHTML = '<i class="ri-sun-fill"></i>';
    localStorage.removeItem('theme');
}

// Get Theme
const theme = localStorage.getItem('theme');

if (theme === 'darkMode') {
    setDarkMode();
} else {
    setLightMode();
}

// Detect Theme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setDarkMode();
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        setDarkMode();
    } else {
        setLightMode();
    }
});