let currentRank = null;
let desiredRank = null;
let selectedMap = null;

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

const mapNames = {
  1: "Brewery Map",
  2: "Dogtown Map",
  3: "Overpass",
  4: "Vertigo",
  5: "Nuke",
  6: "Inferno",
};

// Цены
const rankPrices = {
  1: 100, 2: 200, 3: 300, 4: 400, 5: 500, 6: 600,
  7: 700, 8: 800, 9: 900, 10: 1000, 11: 1100, 12: 1200,
  13: 1300, 14: 1400, 15: 1500, 16: 1600, 17: 1700, 18: 1800
};

document.addEventListener('DOMContentLoaded', function() {
  initRankSelection();
  initThemeSelector();
});

function initRankSelection() {
  document.querySelectorAll('.current-rank .rank-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const rank = parseInt(this.dataset.rank);
      
      document.querySelectorAll('.current-rank .rank-selected').forEach(el => {
        el.classList.remove('rank-selected');
      });
      
      currentRank = rank;
      this.classList.add('rank-selected');
      updateCurrentRankDisplay(this.src, rank);
    });
  });
  
  document.querySelectorAll('.desired-rank .rank-icon').forEach(icon => {
    icon.addEventListener('click', function() {
      const rank = parseInt(this.dataset.rank);
      
      document.querySelectorAll('.desired-rank .rank-selected').forEach(el => {
        el.classList.remove('rank-selected');
      });
      
      desiredRank = rank;
      this.classList.add('rank-selected');
      
      updateDesiredRankDisplay(this.src, rank);
    });
  });
  
  document.querySelectorAll('.map-item').forEach(item => {
    item.addEventListener('click', function() {
      const mapIcon = this.querySelector('.map-icon');
      const map = parseInt(mapIcon.dataset.map);
      
      document.querySelectorAll('.map-item.selected').forEach(el => {
        el.classList.remove('selected');
      });
      
      selectedMap = map;
      this.classList.add('selected');
      
      updateSelectedMapDisplay(mapIcon.src, map);
    });
  });
  
  document.querySelector('.calculate-btn').addEventListener('click', calculateBoost);
}

function updateCurrentRankDisplay(src, rank) {
  const imgElement = document.getElementById('current-image');
  const nameElement = document.getElementById('current-rank-name');
  
  imgElement.src = src;
  imgElement.classList.remove('hidden');
  imgElement.classList.add('show');
  
  nameElement.textContent = rankNames[rank];
}

function updateDesiredRankDisplay(src, rank) {
  const imgElement = document.getElementById('desired-image');
  const nameElement = document.getElementById('desired-rank-name');
  
  imgElement.src = src;
  imgElement.classList.remove('hidden');
  imgElement.classList.add('show');
  
  nameElement.textContent = rankNames[rank];
}

function updateSelectedMapDisplay(src, map) {
  const imgElement = document.getElementById('selected-map-image');
  const nameElement = document.getElementById('selected-map-name');
  
  imgElement.src = src;
  imgElement.classList.remove('hidden');
  imgElement.classList.add('show');
  
  nameElement.textContent = mapNames[map];
}

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
  
  let totalPrice = 0;
  for (let i = currentRank; i < desiredRank; i++) {
    totalPrice += rankPrices[i];
  }
  
  const mapPriceMultiplier = selectedMap <= 9 ? 1.0 : 0.9; 
  totalPrice = Math.round(totalPrice * mapPriceMultiplier);
  
  showResult(`Стоимость буста: ${totalPrice} руб.`);
}

function showResult(message, isError = false) {
  const resultElement = document.getElementById('boostResult');
  resultElement.textContent = message;
  resultElement.style.color = isError ? 'var(--error-color)' : 'var(--success-color)';
  
  resultElement.classList.remove('show');
  setTimeout(() => {
    resultElement.classList.add('show');
  }, 10);
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