document.addEventListener('DOMContentLoaded', () => {
  const btnYes = document.querySelector('.btnYes');
  const btnNo = document.querySelector('.btnNo');
  const banner = document.querySelector('.corePixel');
  const gatinhoBravo = document.querySelector('.gatinhoBravo');
  const titleEl = document.querySelector('.title');
  const jasnaEl = document.querySelector('.jasna');
  let translationsCache = null;

  const CHANCE_TO_STAY = 0.03;

  const detectLanguage = () =>
      (navigator.language || 'pt-br').toLowerCase();

  const loadTranslations = async (lang) => {
    if (translationsCache) return translationsCache;
    try {
      const res = await fetch('resources/language/translations.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const shortLang = lang.split('-')[0];
      const langData =
          data[lang] || data[shortLang] || data['pt-br'] || {};
      translationsCache = {
        ...langData,
        globals: data.globals || {},
      };
      return translationsCache;
    } catch (err) {
      console.error('Erro ao carregar traduções:', err);
      return translationsCache || { index: {}, globals: {} };
    }
  };

  const applyTranslations = ({ index = {}, globals = {} }) => {
    titleEl.textContent = index.title || titleEl.textContent;
    jasnaEl.textContent = globals.name || jasnaEl.textContent;
    btnYes.textContent = index.btnYes || btnYes.textContent;
    btnNo.textContent = index.btnNo || btnNo.textContent;
  };

  const repositionBtnNo = () => {
    const { width: w, height: h } = btnNo.getBoundingClientRect();
    const x = Math.random() * (window.innerWidth - w);
    const y = Math.random() * (window.innerHeight - h);
    Object.assign(btnNo.style, {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
    });
  };

  const throttle = (fn, ms = 100) => {
    let ready = true;
    return (...args) => {
      if (!ready) return;
      ready = false;
      fn(...args);
      setTimeout(() => (ready = true), ms);
    };
  };

  btnYes.addEventListener('click', () => {
    window.location.href = 'presente.html';
  });

  btnNo.addEventListener('mouseover', () => {
    if (Math.random() > CHANCE_TO_STAY) repositionBtnNo();
  });

  document.addEventListener(
      'mousemove',
      throttle((e) => {
        const r = btnNo.getBoundingClientRect();
        const dx = Math.abs(e.clientX - (r.left + r.width / 2));
        const dy = Math.abs(e.clientY - (r.top + r.height / 2));
        if (Math.max(dx, dy) < 150 && Math.random() > CHANCE_TO_STAY) {
          repositionBtnNo();
        }
      }, 50)
  );

  setInterval(() => {
    if (Math.random() > CHANCE_TO_STAY) repositionBtnNo();
  }, 2000);

  btnNo.addEventListener('click', async (e) => {
    if (Math.random() > CHANCE_TO_STAY) {
      e.preventDefault();
      repositionBtnNo();
      return;
    }
    const tr = await loadTranslations(detectLanguage());
    banner.classList.add('disable');
    gatinhoBravo.classList.remove('disable');
    jasnaEl.classList.add('disable');
    titleEl.textContent =
        tr.index.rejectMessage || titleEl.textContent;
  });

  loadTranslations(detectLanguage()).then(applyTranslations);
});