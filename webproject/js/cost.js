document.addEventListener('DOMContentLoaded', function() {
  // Инициализация листания
  initReviewsSlider();
  
  // Инициализация перек
  initThemeSwitcher();
  
  initReviewForm();
});

// листание отзывов
function initReviewsSlider() {
  const items = document.querySelectorAll(".item");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentSlide = 0;
  const totalItems = items.length;

  function showSlide(index) {
    items.forEach((item, i) => {
      item.classList.toggle("active", i === index);
    });
    currentSlide = index;
  }

  function nextSlide() {
    const newIndex = (currentSlide + 1) % totalItems;
    showSlide(newIndex);
  }

  function prevSlide() {
    const newIndex = (currentSlide - 1 + totalItems) % totalItems;
    showSlide(newIndex);
  }

  // Кнопки навигации
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  // Автопрокрутка 5 сек
  let slideInterval = setInterval(nextSlide, 5000);

  // Остановка автопрокрутки при авердение
  const slider = document.querySelector('.reviews-container');
  if (slider) {
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
      slideInterval = setInterval(nextSlide, 5000);
    });
  }

  // Показываем первый слайд
  if (items.length > 0) showSlide(0);
}

// Переключение тем
function initThemeSwitcher() {
  const themeToggle = document.getElementById('theme-toggle');
  const resetThemeBtn = document.getElementById('reset-theme');

  // Проверка темы
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  if (resetThemeBtn) {
    resetThemeBtn.addEventListener('click', function() {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.removeItem('theme');
    });
  }
}

// Функциядобавления отзыва
function initReviewForm() {
  const form = document.getElementById('review-form');
  
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = form.elements['name'].value.trim();
    const rank = form.elements['rank'].value.trim();
    const comment = form.elements['comment'].value.trim();
    
    if (!name || !rank || !comment) {
      showNotification('Пожалуйста, заполните все поля', false);
      return;
    }
    
    // Создаем новый отзыв
    const newReview = document.createElement('div');
    newReview.className = 'item';
    newReview.innerHTML = `
      <div class="review-content">
        <img class="review-avatar" src="img/global/head.png" alt="Аватар">
        <h4 class="review-name">${name}</h4>
        <p class="review-rank">${rank}</p>
        <p class="review-text">&#171;${comment}&#187;</p>
      </div>
    `;
    
    // Добавляем новый отзыв в контейнер
    document.querySelector('.reviews-container').appendChild(newReview);
    
    // Очищаем форму
    form.reset();
    
    // Показываем уведом
    showNotification('Спасибо за ваш отзыв!', true);
    
    // Показываем новый от
    const items = document.querySelectorAll('.item');
    showSlide(items.length - 1);
  });
}

// Функция  уведомления
function showNotification(message, isSuccess) {
  const notification = document.createElement('div');
  notification.className = `notification ${isSuccess ? 'success' : 'error'}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // уведомление
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  // 3 секунды
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}