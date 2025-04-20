document.addEventListener('DOMContentLoaded', () => {
  const CHANCE_TO_STAY = 0.08;

  const btnYes      = document.querySelector('.btnYes');
  const btnNo       = document.querySelector('.btnNo');
  const banner      = document.querySelector('.corePixel');
  const gatinhoBravo= document.querySelector('.gatinhoBravo');
  const titleEl     = document.querySelector('.title');
  const jasnaEl     = document.querySelector('.jasna');
  let translationsCache = null;

  btnNo.onmouseover = null;
  btnNo.onmousedown = null;
  btnNo.onclick  = null;

  const detectLanguage = () =>
      (navigator.language || 'pt-br').toLowerCase();

  const loadTranslations = async (lang) => {
    if (translationsCache) return translationsCache;
    try {
      const res = await fetch('resources/language/translations.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const short = lang.split('-')[0];
      const langData = data[lang] || data[short] || data['pt-br'] || {};
      translationsCache = { ...langData, globals: data.globals || {} };
      return translationsCache;
    } catch {
      return translationsCache || { index: {}, globals: {} };
    }
  };

  const applyTranslations = ({ index = {}, globals = {} }) => {
    titleEl.textContent = index.title     || titleEl.textContent;
    jasnaEl.textContent = globals.name    || jasnaEl.textContent;
    btnYes.textContent = index.btnYes     || btnYes.textContent;
    btnNo.textContent  = index.btnNo      || btnNo.textContent;
  };

  const reposition = (btn) => {
    const { width: w, height: h } = btn.getBoundingClientRect();
    const x = Math.random() * (window.innerWidth  - w);
    const y = Math.random() * (window.innerHeight - h);
    Object.assign(btn.style, {
      position: 'absolute',
      left:  `${x}px`,
      top:   `${y}px`,
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

  btnNo.addEventListener('pointerenter', () => {
    if (Math.random() > CHANCE_TO_STAY) reposition(btnNo);
  });

  document.addEventListener('pointermove',
      throttle(e => {
        const r = btnNo.getBoundingClientRect();
        const dx = Math.abs(e.clientX - (r.left + r.width / 2));
        const dy = Math.abs(e.clientY - (r.top  + r.height/ 2));
        if (Math.max(dx, dy) < 150 && Math.random() > CHANCE_TO_STAY) {
          reposition(btnNo);
        }
      }, 50)
  );

  setInterval(() => {
    if (Math.random() > CHANCE_TO_STAY) reposition(btnNo);
  }, 2000);

  btnNo.addEventListener('pointerdown', e => {
    if (Math.random() > CHANCE_TO_STAY) {
      e.preventDefault();
      reposition(btnNo);
    }
  });

  btnNo.addEventListener('click', async e => {
    e.preventDefault();
    const tr = await loadTranslations(detectLanguage());
    banner.classList.add('disable');
    gatinhoBravo.classList.remove('disable');
    jasnaEl.classList.add('disable');
    titleEl.textContent = tr.index.rejectMessage || titleEl.textContent;
  });

  loadTranslations(detectLanguage()).then(applyTranslations);
});