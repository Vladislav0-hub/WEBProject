let currentRank = null;
let desiredRank = null;
let selectedMap = null;

// Названия званий на английском
const rankNames = {
  1: "Silver I",
  2: "Silver II",
  3: "Silver III",
  4: "Silver IV",
  5: "Silver Elite",
  6: "Silver Elite Master",
  7: "Gold Nova I",
  8: "Gold Nova II",
  9: "Gold Nova III",
  10: "Gold Nova Master",
  11: "Master Guardian I",
  12: "Master Guardian II",
  13: "Master Guardian Elite",
  14: "Distinguished Master Guardian",
  15: "Legendary Eagle",
  16: "Legendary Eagle Master",
  17: "Supreme Master First Class",
  18: "The Global Elite"
};

// Названия карт
const mapNames = {
  1: "Dust II",
  2: "Mirage",
  3: "Inferno",
  4: "Vertigo",
  5: "Train",
  6: "Anubis",
  7: "Ancient",
  8: "Overpass",
  9: "Nuke",
  10: "Jura Map",
  11: "Grail Map",
  12: "Agency Map",
  13: "Office",
  14: "Italy"
};

// Цены за каждое звание
const rankPrices = {
  1: 100, 2: 200, 3: 300, 4: 400, 5: 500, 6: 600,
  7: 700, 8: 800, 9: 900, 10: 1000, 11: 1100, 12: 1200,
  13: 1300, 14: 1400, 15: 1500, 16: 1600, 17: 1700, 18: 1800
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
  initRankSelection();
  initThemeSelector();
  initOrderForm();
});

// Инициализация формы заказа
function initOrderForm() {
  document.getElementById('submit-order').addEventListener('click', function() {
    const email = document.getElementById('user-email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      alert('Пожалуйста, введите корректный email');
      return;
    }
    
    // Здесь можно добавить код для отправки данных на сервер
    
    // Показываем сообщение об успехе
    document.getElementById('order-success').classList.remove('hidden');
    document.getElementById('order-success').classList.add('show');
    
    // Скрываем форму
    document.getElementById('order-form').classList.add('hidden');
    
    // Очищаем поле
    document.getElementById('user-email').value = '';
  });
}

// Обработка выбора званий и карт
function initRankSelection() {
  // Обработчик для текущего звания
  document.querySelectorAll('.current-rank .rank-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const rank = parseInt(this.dataset.rank);
      
      // Снимаем выделение с предыдущего выбора
      document.querySelectorAll('.current-rank .rank-selected').forEach(el => {
        el.classList.remove('rank-selected');
      });
      
      // Устанавливаем новое выбранное звание
      currentRank = rank;
      this.classList.add('rank-selected');
      
      // Обновляем отображение
      updateCurrentRankDisplay(this.src, rank);
    });
  });
  
  // Обработчик для желаемого звания
  document.querySelectorAll('.desired-rank .rank-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const rank = parseInt(this.dataset.rank);
      
      // Снимаем выделение с предыдущего выбора
      document.querySelectorAll('.desired-rank .rank-selected').forEach(el => {
        el.classList.remove('rank-selected');
      });
      
      // Устанавливаем новое выбранное звание
      desiredRank = rank;
      this.classList.add('rank-selected');
      
      // Обновляем отображение
      updateDesiredRankDisplay(this.src, rank);
    });
  });
  
  // Обработчик выбора карты
  document.querySelectorAll('.map-item').forEach(item => {
    item.addEventListener('click', function() {
      const mapIcon = this.querySelector('.map-icon');
      const map = parseInt(mapIcon.dataset.map);
      
      // Снимаем выделение с предыдущего выбора
      document.querySelectorAll('.map-item.selected').forEach(el => {
        el.classList.remove('selected');
      });
      
      // Устанавливаем новую выбранную карту
      selectedMap = map;
      this.classList.add('selected');
      
      // Обновляем отображение выбранной карты
      updateSelectedMapDisplay(mapIcon.src, map);
    });
  });
  
  // Кнопка расчета
  document.querySelector('.calculate-btn').addEventListener('click', calculateBoost);
}

// Обновление отображения текущего звания
function updateCurrentRankDisplay(src, rank) {
  const imgElement = document.getElementById('current-image');
  const nameElement = document.getElementById('current-rank-name');
  
  imgElement.src = src;
  imgElement.classList.remove('hidden');
  imgElement.classList.add('show');
  
  nameElement.textContent = rankNames[rank];
}

// Обновление отображения желаемого звания
function updateDesiredRankDisplay(src, rank) {
  const imgElement = document.getElementById('desired-image');
  const nameElement = document.getElementById('desired-rank-name');
  
  imgElement.src = src;
  imgElement.classList.remove('hidden');
  imgElement.classList.add('show');
  
  nameElement.textContent = rankNames[rank];
}

// Обновление отображения выбранной карты
function updateSelectedMapDisplay(src, map) {
  const imgElement = document.getElementById('selected-map-image');
  const nameElement = document.getElementById('selected-map-name');
  
  imgElement.src = src;
  imgElement.classList.remove('hidden');
  imgElement.classList.add('show');
  
  nameElement.textContent = mapNames[map];
}

// Расчет стоимости буста
function calculateBoost() {
  if (!currentRank || !desiredRank) {
    showResult("Пожалуйста, выберите текущее и желаемое звания", true);
    return;
  }
  
  if (!selectedMap) {
    showResult("Пожалуйста, выберите карту", true);
    return;
  }
  
  if (currentRank >= desiredRank) {
    showResult("Желаемое звание должно быть выше текущего", true);
    return;
  }
  
  // Считаем общую стоимость
  let totalPrice = 0;
  for (let i = currentRank; i < desiredRank; i++) {
    totalPrice += rankPrices[i];
  }
  
  // Добавляем стоимость в зависимости от выбранной карты
  const mapPriceMultiplier = selectedMap <= 9 ? 1.0 : 0.9; // Основные карты дороже
  totalPrice = Math.round(totalPrice * mapPriceMultiplier);
  
  showResult(`Стоимость буста: ${totalPrice} руб.`);
}

// Отображение результата
function showResult(message, isError = false) {
  const resultElement = document.getElementById('boostResult');
  resultElement.textContent = message;
  resultElement.style.color = isError ? 'var(--error-color)' : 'var(--success-color)';
  
  // Анимация появления
  resultElement.classList.remove('show');
  setTimeout(() => {
    resultElement.classList.add('show');
  }, 10);
  
  // Показываем форму только если нет ошибки
  if (!isError) {
    const orderForm = document.getElementById('order-form');
    orderForm.classList.remove('hidden');
    orderForm.classList.add('show');
    
    // Скрываем сообщение об успехе, если оно было показано ранее
    document.getElementById('order-success').classList.add('hidden');
  }
}

function initThemeSelector() {
  const themeToggle = document.getElementById('theme-toggle');
  const resetThemeBtn = document.getElementById('reset-theme');

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
  
  resetThemeBtn.addEventListener('click', function() {
    document.documentElement.removeAttribute('data-theme');
    localStorage.removeItem('theme');
  });
}