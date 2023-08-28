const lightStyles = document.querySelectorAll('input[value=light]');
const darkStyles = document.querySelectorAll('input[value=dark]');
const html = document.querySelector('html');
const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');
const switcherRadios = document.querySelectorAll('.switcher__radio');

function switchMedia(scheme) {
  let lightMedia;
  let darkMedia;

  if (scheme === 'auto') {
   html.setAttribute('data-theme', 'auto')
  } else {
    lightMedia = (scheme === 'light') ?  html.setAttribute('data-theme', 'light') : 'not all';
    darkMedia = (scheme === 'dark') ?  html.setAttribute('data-theme', 'dark') : 'not all';
  }

  [...lightStyles].forEach((link) => {
    // console.log(link.media);
    link.media = lightMedia;
  });

  [...darkStyles].forEach((link) => {
    link.media = darkMedia;
  });
}

function getSystemScheme() {
  const darkScheme = darkSchemeMedia.matches;

  return darkScheme ? 'dark' :  'light';
}

function getSavedScheme() {
  return localStorage.getItem('color-scheme');
}

function saveScheme(scheme) {
  localStorage.setItem('color-scheme', scheme);
}

function clearScheme() {
  localStorage.removeItem('color-scheme');
}

function setScheme(scheme) {
  switchMedia(scheme);

  if (scheme === 'auto') {
    clearScheme();
  } else {
    saveScheme(scheme);
  }
}

function setupScheme() {
  const savedScheme = getSavedScheme();
  const systemScheme = getSystemScheme();

  if (savedScheme === null) return;

  if (savedScheme !== systemScheme) {
    setScheme(savedScheme);
  }
}

function setupSwitcher() {
  const savedScheme = getSavedScheme();

  if (savedScheme !== null) {
    const currentRadio = document.querySelector(`.switcher__radio[value=${savedScheme}]`);
    currentRadio.checked = true;
  }

  [...switcherRadios].forEach((radio) => {
    radio.addEventListener('change', (event) => {
      setScheme(event.target.value);
    });
  });
}

setupSwitcher();
setupScheme();