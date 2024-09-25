document.addEventListener('DOMContentLoaded', () => {
  const presenteImg = document.querySelector(".presente");
  const abertaImg = document.querySelector(".aberta");
  const gatinhoImg = document.querySelector(".gatinho");
  const title = document.querySelector(".title");
  const balaos = document.querySelector(".balaos");

  function detectLanguage() {
    const language = navigator.language.toLowerCase();
    return language;
  }

  async function loadTranslations(lang) {
    try {
      const response = await fetch('resources/language/translations.json');
      const translations = await response.json();
      return translations[lang] || translations["pt-br"];
    } catch (error) {
      console.error("Erro ao carregar o arquivo de traduções:", error);
      return null;
    }
  }

  function applyTranslations(translations) {
    title.querySelector('h1').textContent = translations.presente.title;
  }

  function abrir() {
    presenteImg.classList.add('disable');
    abertaImg.classList.remove('disable');
    gatinhoImg.classList.remove('disable');
    title.classList.remove('disable');
    balaos.classList.remove('disable');

    setTimeout(() => {
      yt();
    }, 7000);
  }

  function yt() {
    location.href = "https://www.youtube.com/watch?v=rs6Y4kZ8qtw";
  }

  const userLang = detectLanguage();
  loadTranslations(userLang).then(applyTranslations);
});