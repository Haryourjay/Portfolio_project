// Toggle light/dark theme
document.getElementById('themeToggle')?.addEventListener('click', () => {

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
});