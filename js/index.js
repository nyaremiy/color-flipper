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
