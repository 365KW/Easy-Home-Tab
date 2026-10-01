document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('search-form');
  const searchBox = document.getElementById('cnm-search-box');
  const engineBtns = document.querySelectorAll('.action-btn[data-engine]');
  const themeToggle = document.getElementById('theme-toggle');
  const iconSun = document.querySelector('.theme-toggle .icon-sun');
  const iconMoon = document.querySelector('.theme-toggle .icon-moon');
  const logoBingDark = document.getElementById('logo-bing-dark');
  const logoBingLight = document.getElementById('logo-bing-light');
  const logoGoogle = document.getElementById('logo-google');
  const logoGoogleColor = document.getElementById('logo-google-color');

  const engines = {
    google: 'https://www.google.com/search?q=',
    bing: 'https://www.bing.com/search?q='
  };

  let currentEngine = localStorage.getItem('searchEngine') || 'bing';
  let currentTheme = localStorage.getItem('theme') || 'dark';

  function updateUI() {
    engineBtns.forEach(btn => {
      const isActive = btn.dataset.engine === currentEngine;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });

    logoBingDark.classList.toggle('active', currentEngine === 'bing' && currentTheme === 'dark');
    logoBingLight.classList.toggle('active', currentEngine === 'bing' && currentTheme === 'light');
    logoGoogle.classList.toggle('active', currentEngine === 'google' && currentTheme === 'dark');
    logoGoogleColor.classList.toggle('active', currentEngine === 'google' && currentTheme === 'light');
  }

  function applyTheme() {
    document.documentElement.dataset.theme = currentTheme;
    const isLight = currentTheme === 'light';
    iconSun.classList.toggle('active', !isLight);
    iconMoon.classList.toggle('active', isLight);
    themeToggle.setAttribute('aria-pressed', isLight);
    themeToggle.setAttribute('aria-label', isLight ? '切换到深色配色' : '切换到浅色配色');
    updateUI();
  }

  function handleSearch(e) {
    e.preventDefault();
    const query = searchBox.value.trim();
    if (query) {
      window.location.href = `${engines[currentEngine]}${encodeURIComponent(query)}`;
    }
  }

  engineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentEngine = btn.dataset.engine;
      localStorage.setItem('searchEngine', currentEngine);
      updateUI();
      searchBox.focus();
    });
  });

  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyTheme();
  });

  searchForm.addEventListener('submit', handleSearch);

  applyTheme();
  searchBox.focus();
});
