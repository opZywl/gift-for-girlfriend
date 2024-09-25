document.addEventListener('DOMContentLoaded', () => {
  const btnYes = document.querySelector(".btnYes");
  const btnNo = document.querySelector(".btnNo");
  const banner = document.querySelector(".corePixel");
  const gatinhoBravo = document.querySelector(".gatinhoBravo");
  const title = document.querySelector(".title");
  const jasna = document.querySelector(".jasna");

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
      console.error("Erro ao carregar o arquivo de traduções:", error);
      return null;
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