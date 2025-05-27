document.addEventListener('DOMContentLoaded', function() {
  // Инициализация переключения тем
  initThemeSwitcher();
  
  // Инициализация других функций, если есть
  initServicesPage();
});

function initThemeSwitcher() {
  const themeToggle = document.getElementById('theme-toggle');
  const resetThemeBtn = document.getElementById('reset-theme');

  // Проверяем сохраненную тему при загрузке
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    // Устанавливаем светлую тему по умолчанию
    applyTheme('light');
  }

  // Обработчик переключения темы
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Обработчик сброса темы
  if (resetThemeBtn) {
    resetThemeBtn.addEventListener('click', function() {
      applyTheme('light');
      localStorage.removeItem('theme');
    });
  }
}

function applyTheme(theme) {
  // Применяем тему к документу
  document.documentElement.setAttribute('data-theme', theme);
}

function initServicesPage() {
  // Инициализация специфичных для страницы функций
  $(document).ready(function() {
    $(".box").click(function() {
      var text = $(this).data("text");
      $(".content").text(text);
    });

    $("#games-amount").on("input", function() {
      var value = $(this).val();
      $("#current-value").text(value);
    });
  });
}