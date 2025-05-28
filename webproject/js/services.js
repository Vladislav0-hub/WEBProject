document.addEventListener('DOMContentLoaded', function() {
  initThemeSwitcher();
  
  initServicesPage();
});

function initThemeSwitcher() {
  const themeToggle = document.getElementById('theme-toggle');
  const resetThemeBtn = document.getElementById('reset-theme');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    applyTheme('light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  if (resetThemeBtn) {
    resetThemeBtn.addEventListener('click', function() {
      applyTheme('light');
      localStorage.removeItem('theme');
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function initServicesPage() {
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