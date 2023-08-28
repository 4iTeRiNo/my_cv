import './sass/main.scss';

const lightStyles = document.querySelectorAll('input[value=light]');
const darkStyles = document.querySelectorAll('input[value=dark]');
const html = document.querySelector('html');
const darkSchemeMedia = matchMedia('(prefers-color-scheme: dark)');
const switcherRadios = document.querySelectorAll('.switcher__radio');
console.log(darkSchemeMedia);

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
      console.log(event.target.value);
      setScheme(event.target.value);
    });
  });
}

setupSwitcher();
setupScheme();


// // Toggle between light and dark themes when the theme toggle button is clicked
// const themeToggle = document.querySelector('.theme-toggle');
// var checkbox = document.querySelectorAll('input[name=color-scheme]');

// console.log(checkbox);

// checkbox.forEach((elem)=> {
//   elem.addEventListener('click', toggleTheme);
// })

// function toggleTheme() {
 
//     console.log(checkbox);
//   if (checkbox.value === 'dark') {
//     setTheme('dark');
//   } else if(checkbox.value === 'auto') {
//     setTheme('auto');
//   } else {
//     setTheme('auto')
//   }
// }

// function setTheme(theme) {
//   const html = document.querySelector('html');
//   html.setAttribute('data-theme', theme);
// }



// // var checkboxDark = document.querySelector('input[value=dark]');
// console.log(checkbox);

// checkbox.addEventListener('change', (e)=> {
//   console.log(e.target.value );
//     if(e.target.value === 'dark') {
//         document.documentElement.setAttribute('data-theme', 'dark')
//     } else if(e.target.value === 'light'){
//         document.documentElement.setAttribute('data-theme', 'light')
//     }
// })



