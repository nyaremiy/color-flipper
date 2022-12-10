import { SYMBOLS as symbols } from "./hexadecimalSymbols.js";
import { handleTouchMove, handleTouchStart } from "./swipe.js";

const mainBlock = document.querySelector('.main');
const buttonGenerateNewColor = document.getElementById('js-btn-new-color');
const buttonCopyToClipboardColor = document.getElementById('js-btn-copy-color');
const textColor = document.getElementById('js-color-text');
const logo = document.querySelector('.logo');
let hexColor = '';

buttonGenerateNewColor.addEventListener('click', randomBgPage);

buttonCopyToClipboardColor.addEventListener('click', () => {
  copyToClipboard(hexColor);
  const messageCopyColor = document.querySelector('.copy-to-clipboard');
  messageCopyColor.classList.add('copy-to-clipboard--show');
  setTimeout(() => {
    messageCopyColor.classList.remove('copy-to-clipboard--show');
  }, 2000);
});

function hexGeneratorColor() {
  let color = '#';

  for (let i = 0; i < 6; i++) {
    const randomSymbolIndex = randomNumber(0, symbols.length);
    color += symbols[randomSymbolIndex];
  }

  return color;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomBgPage() {
  hexColor = hexGeneratorColor();
  mainBlock.style = `background: ${hexColor}`;
  textColor.textContent = hexColor;
  logo.style = `color: ${hexColor}`;
}

randomBgPage();

function copyToClipboard(color) {
  navigator.clipboard.writeText(color);
}

// Бокова панель збережених кольорів
const boxColors = document.querySelector('.box-colors');

boxColors.addEventListener('touchstart', handleTouchStart, false);
boxColors.addEventListener('touchmove', handleTouchMove, false);
document.body.addEventListener('touchstart', handleTouchStart, false);
document.body.addEventListener('touchmove', handleTouchMove, false);

// Збережені кольори

let savedColors = [];

const btnSave = document.getElementById('js-btn-save-color');
const listColor = document.querySelector('.box-colors__list');

btnSave.addEventListener('click', () => {
  saveColorToArray(hexColor);
  fillListSaveColors();
  clickToSaveColor();
});

function saveColorToArray (color) {
  if (!checkSameColor(color)) {
    savedColors.push(color);
  }
}

function checkSameColor(newColor) {
  let isColor = false;
  savedColors.forEach((color) => {
    if (color === newColor) {
      isColor = true;
      return isColor;
    }
  });
  return isColor;
}

function fillListSaveColors() {
  listColor.innerHTML = null;
  savedColors.forEach((color) => {
    listColor.innerHTML += `
    <div class="color" >
      <div class="color__bg" style="background: ${color}"></div>
      <div class="color__hex" data-color="${color}">${color}</div>
      <button
        type="button"
        class="btn btn--remove"
        data-color="${color}"
      >
        remove
      </button>
  </div>
`;
  });
}

function clickToSaveColor() {
  const colorsListHtml = document.querySelector('.box-colors__list');

  colorsListHtml.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn--remove')) {
      savedColors = savedColors.filter(color => color !==  e.target.dataset.color);
      fillListSaveColors();
    }
    if(e.target.classList.contains('color__hex')) {
      let color = e.target.dataset.color;
      console.dir(color);
      copyToClipboard(color);
      e.target.classList.add('disabled-click');
      e.target.textContent = 'Copied...'
      setTimeout(() => {
        e.target.classList.remove('disabled-click');
        e.target.textContent = `${color}`;
      }, 800)
    }
  })

}
