document.addEventListener('DOMContentLoaded', function() {
  // Инициализация переключения тем
  initThemeSwitcher();
});

function initThemeSwitcher() {
  const themeToggle = document.getElementById('theme-toggle');
  const resetThemeBtn = document.getElementById('reset-theme');

  // Проверяем сохраненную тему
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  // Обработчик переключения темы
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Обработчик сброса темы
  if (resetThemeBtn) {
    resetThemeBtn.addEventListener('click', function() {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.removeItem('theme');
    });
  }
}