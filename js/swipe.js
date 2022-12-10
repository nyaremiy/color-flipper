const boxColors = document.querySelector('.box-colors');


let xDown = null;
let yDown = null;

export function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX;
  yDown = evt.touches[0].clientY;
}

export function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;
  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      /* left swipe */
      boxColors.classList.toggle('open');
    } else {
      /* right swipe */
      boxColors.classList.toggle('open');
    }
  }
  xDown = null;
  yDown = null;
}