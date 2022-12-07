console.log('App started...');

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
  const symbols = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '0',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
  ];
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

const boxColors = document.querySelector('.box-colors');

boxColors.addEventListener('touchstart', handleTouchStart, false);
boxColors.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;
  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      /* left swipe */
      boxColors.classList.toggle('open');
    } else {
      /* right swipe */
      boxColors.classList.toggle('open');
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

const saveColor = [];

const btnSave = document.getElementById('js-btn-save-color');
const listColor = document.querySelector('.box-colors__list');

btnSave.addEventListener('click', () => {
  saveColor.push(hexColor);
  fillListSaveColors();
});

function fillListSaveColors() {
  listColor.innerHTML = null;
  saveColor.forEach((color) => {
    listColor.innerHTML += `
    <div class="color">
      <div class="color__bg" style="background: ${color}"></div>
      <div class="color__hex">${color}</div>
      <button
        type="button"
        class="btn btn--remove"
        id="js-btn-copy-color"
      >
        remove
      </button>
  </div>
`;
  });
}
