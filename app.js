// select all option elements
const options = document.querySelectorAll('option');
const buttons = document.querySelectorAll('button');
const select = document.querySelector('select');
const p = document.querySelector('.is-one-quarter');

const player1Score = document.querySelector('#player-1-score');
const player2Score = document.querySelector('#player-2-score');

// Clear <select> value - write 0, 0 to score on DOM
window.onload = () => {
  select.value = '';
  writeScore(0, 0);
};

//Listen for <select> change, start game when user selects a match point
let matchPoint = 0;
select.addEventListener('change', (e) => {
  matchPoint = Number(e.target.value);
  for (let button of buttons) {
    if (button.id !== 'reset') {
      button.disabled = false;
    }
  }
  p.innerHTML = 'Playing To:';
});

for (let button of buttons) {
  button.addEventListener('click', (e) => {
    // Get id of button, and increment the score, outpit to the DOM, or reload the page.
    if (e.target.id === 'reset') {
      reset();
    }
    if (e.target.id === 'p1') {
      player1Score.dataset.score++;
      checkEndGame(player1Score.dataset.score);
      writeScore(player1Score.dataset.score, player2Score.dataset.score);
    }
    if (e.target.id === 'p2') {
      player2Score.dataset.score++;
      checkEndGame(player2Score.dataset.score);
      writeScore(player1Score.dataset.score, player2Score.dataset.score);
    }
  });
}

function writeScore(player1, player2) {
  player1Score.textContent = player1;
  player2Score.textContent = player2;
}

function reset() {
  window.location.reload();
}

function checkEndGame(score) {
  if (Number(score) === matchPoint) {
    console.log('Match over');
    // Disable all buttons - except reset, and color the winning/losing player
    for (let button of buttons) {
      if (button.id !== 'reset') {
        button.disabled = true;
      }
    }
    if (
      Number(player1Score.dataset.score) > Number(player2Score.dataset.score)
    ) {
      player1Score.classList.add('green');
      player2Score.classList.add('red');
    } else {
      player2Score.classList.add('green');
      player1Score.classList.add('red');
    }
  }
}
