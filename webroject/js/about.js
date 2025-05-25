document.addEventListener('DOMContentLoaded', () => {
    const themeSelector = document.getElementById('theme-selector');
    const resetThemeButton = document.getElementById('reset-theme');

    
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeSelector.value = savedTheme;
    }
  
    
    themeSelector.addEventListener('change', (event) => {
        const selectedTheme = event.target.value;
        document.documentElement.setAttribute('data-theme', selectedTheme);
        localStorage.setItem('theme', selectedTheme);
    });
  
    
    resetThemeButton.addEventListener('click', () => {
        localStorage.removeItem('theme');
        document.documentElement.removeAttribute('data-theme');
        themeSelector.value = 'light';
    });
  })