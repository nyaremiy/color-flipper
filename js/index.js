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

const boxColorsLines = document.querySelector('.box-colors__lines');
const boxColors = document.querySelector('.box-colors');

//

boxColorsLines.addEventListener('mouseover', () => {
  boxColors.classList.toggle('box-colors--open');
});

// Вешаем на прикосновение функцию handleTouchStart
// document.addEventListener('touchstart', handleTouchStart, false);
boxColorsLines.addEventListener('touchstart', handleTouchStart, false);
// А на движение пальцем по экрану - handleTouchMove
// document.addEventListener('touchmove', handleTouchMove, false);
boxColorsLines.addEventListener('touchmove', handleTouchMove, false);

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
  // немного поясню здесь. Тут берутся модули движения по оси абсцисс и ординат (почему модули? потому что если движение сделано влево или вниз, то его показатель будет отрицательным) и сравнивается, чего было больше: движения по абсциссам или ординатам. Нужно это для того, чтобы, если пользователь провел вправо, но немного наискосок вниз, сработал именно коллбэк для движения вправо, а ни как-то иначе.
  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* left swipe */
      console.log(1);
      boxColors.style = 'right: 0';
    } else {
      /* right swipe */
      boxColors.style = 'right: -380px';
    }
  } else {
    // Это вам, в общем-то, не надо, вы ведь только влево-вправо собираетесь двигать
    if (yDiff > 0) {
      /* up swipe */
    } else {
      /* down swipe */
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
}
