document.addEventListener('DOMContentLoaded', () => {
  const btnYes = document.querySelector(".btnYes");
  const btnNo = document.querySelector(".btnNo");
  const banner = document.querySelector(".corePixel");
  const gatinhoBravo = document.querySelector(".gatinhoBravo");
  const title = document.querySelector(".title");
  const jasna = document.querySelector(".jasna");

  function desvia(btn) {
    btn.style.position = 'absolute';
    btn.style.bottom = geraPosicao(10, 90);
    btn.style.left = geraPosicao(10, 90);
  }

  function geraPosicao(min, max) {
    return (Math.random() * (max - min) + min) + "%";
  }

  function detectLanguage() {
    const language = navigator.language.toLowerCase();
    return language;
  }

  async function loadTranslations(lang) {
    try {
      const response = await fetch('resources/language/translations.json');
      const translations = await response.json();
      const langTranslations = translations[lang] || translations["pt-br"];
      const globals = translations["globals"];
      return { ...langTranslations, globals };
    } catch (error) {
      console.error("Error loading the translation file:", error);
      const translations = await loadFallbackTranslations(lang);
      return translations;
    }
  }

  async function loadFallbackTranslations(lang) {
    try {
      const response = await fetch('resources/language/translations.json');
      const translations = await response.json();
      const langTranslations = translations[lang] || translations["pt-br"];
      console.error(langTranslations.errors.loadTranslations);
      return langTranslations;
    } catch (error) {
      console.error("Fallback error occurred:", error);
    }
  }

  function applyTranslations(translations) {
    title.textContent = translations.index.title;
    jasna.textContent = translations.globals.name;
    btnYes.textContent = translations.index.btnYes;
    btnNo.textContent = translations.index.btnNo;
  }

  btnYes.addEventListener('click', () => {
    location.href = "presente.html";
  });

  btnNo.addEventListener('mouseover', () => desvia(btnNo));

  btnNo.addEventListener('click', async () => {
    const translations = await loadTranslations(detectLanguage());
    banner.classList.add('disable');
    gatinhoBravo.classList.remove('disable');
    jasna.classList.add('disable');
    title.textContent = translations.index.rejectMessage;
  });

  const userLang = detectLanguage();
  loadTranslations(userLang).then(applyTranslations);
});