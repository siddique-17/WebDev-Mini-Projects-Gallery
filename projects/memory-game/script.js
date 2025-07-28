const grid = document.querySelector('.grid');
const cards = ['🍕','🍔','🍟','🌭','🥓','🥞','🍕','🍔','🍟','🌭','🥓','🥞'];
let selected = [];
let matched = [];

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  shuffle(cards).forEach((emoji, i) => {
    const card = document.createElement('div');
    card.dataset.id = i;
    card.innerHTML = '<img src="https://via.placeholder.com/100?text=?" />';
    card.addEventListener('click', () => flipCard(card, emoji));
    grid.appendChild(card);
  });
}

function flipCard(card, emoji) {
  if (selected.length === 2 || card.classList.contains('matched')) return;
  card.innerHTML = `<span style="font-size: 60px;">${emoji}</span>`;
  selected.push({ card, emoji });

  if (selected.length === 2) {
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [first, second] = selected;
  if (first.emoji === second.emoji) {
    first.card.classList.add('matched');
    second.card.classList.add('matched');
  } else {
    first.card.innerHTML = '<img src="https://via.placeholder.com/100?text=?" />';
    second.card.innerHTML = '<img src="https://via.placeholder.com/100?text=?" />';
  }
  selected = [];
}

createBoard();
