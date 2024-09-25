const presenteImg = document.querySelector(".presente");
const abertaImg = document.querySelector(".aberta");
const gatinhoImg = document.querySelector(".gatinho");
const title = document.querySelector(".title");
const balaos = document.querySelector(".balaos");

const translations = {
  "pt-br": {
    title: "UMA FLOR PARA OUTRA FLOR, PARABÉNS MEU AMOR, EU TE AMO!"
  },
  "en-us": {
    title: "A FLOWER FOR ANOTHER FLOWER, HAPPY BIRTHDAY MY LOVE, I LOVE YOU!"
  }
};

function detectLanguage() {
  const language = navigator.language.toLowerCase();
  return translations[language] ? language : "pt-br";
}

function applyTranslations(lang) {
  title.querySelector('h1').textContent = translations[lang].title;
}

const userLang = detectLanguage();
applyTranslations(userLang);

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
