const freeSpace = {text: "\"How did they die?\"", active: true};

const initialText = [
  "Someone nobody knows comes, does not introduce self",
  "Someone talks for 3+ minutes about their own dead relative",
  "Zoom shiva visitor is accidentally not on mute",
  "What's the grammar for Hamakom Yenachem to [one person / all women]?",
  "Two shiva visitors are exes of each other",
  "Someone asks where the food is",
  "Yahrzeit candle goes out",
  "Somebody corrects an avel about Hilchot Aveilut",
  "\"Were they in pain?\"",
  "Someone clearly doesn't actually know who died",
  "Food delivery that the aveilim can't eat",
  "Shiva gift from shiva.com",
  "\"Are you going to be saying Kaddish even though you're a woman?\"",
];
let items = initialText.map(t => ({text: t, active: true}));
items.push(freeSpace);

function generateBoard() {
  const board = document.getElementById('bingoBoard');
  board.innerHTML = '';
  let displayItems = items.filter(item => item.active && item.text !== freeSpace.text); // Exclude "How did he die?" from random placement

  if (items.length >= 24) {
    // If more than 25 items, select 25 randomly without replacement
    displayItems = [];
    let tempItems = items.filter(item => item.active && item.text !== freeSpace.text); // Exclude "How did he die?" from random placement
    for (let i = 0; i < 24; i++) {
      const randomIndex = Math.floor(Math.random() * tempItems.length);
      displayItems.push(tempItems[randomIndex]);
      tempItems.splice(randomIndex, 1); // Remove the selected item
    }
  } else {
   // If fewer than 24 items, fill up with empty strings after copying existing items
    displayItems = items.filter(item => item.active && item.text !== freeSpace.text); // Exclude "How did he die?" from random placement
    while (displayItems.length < 24) {
      displayItems.push({text: '', active: false}); // Add empty string items
    }
  }
  // Insert "How did he die?" at the middle position
  displayItems.splice(12, 0, freeSpace.active ? freeSpace : {text: '', active: true});

  for (let i = 0; i < 25; i++) {
    const cell = document.createElement('div');
    cell.innerHTML = i == 12 ? "FREE SPACE<br><br>" : '';
    cell.innerHTML += displayItems[i].text;
    cell.className = 'bingo-cell';
    board.appendChild(cell);
  }
}

function updateItemsList() {
  const list = document.getElementById('itemsList');
  list.innerHTML = '';
  items.forEach((item, index) => {

    // item creation
    const itemElement = document.createElement('div');
    itemElement.className = item.active ? 'item item-active' : 'item item-inactive';
    itemElement.textContent = item.text;

    // remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'x';
    removeBtn.onclick = () => {
      items[index].active = !items[index].active; // Toggle the active state
      updateItemsList();
      generateBoard();
    };
    itemElement.appendChild(removeBtn);
    list.appendChild(itemElement);
  });
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
}

// Example function to toggle item state
function toggleItemState(itemId) {
  const item = document.getElementById(itemId);
  const isActive = item.classList.contains('item-active');

  if (isActive) {
    item.classList.remove('item-active');
    item.classList.add('item-inactive');
    // Additional logic to remove the item from the board
  } else {
    item.classList.remove('item-inactive');
    item.classList.add('item-active');
    // Additional logic to add the item back to the board
  }
}

// Example of attaching event listeners to items
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', () => toggleItemState(item.id));
});

document.getElementById('shuffleItems').addEventListener('click', () => {
  shuffleArray(items);
  updateItemsList();
  generateBoard();
});

// document.getElementById('randomizeBoard').addEventListener('click', () => {
//   shuffleArray(initialItems);
//   items = [...initialItems]; // this should change anyway to account for new structure
//   updateItemsList();
//   generateBoard();
// });

document.getElementById('addItem').addEventListener('click', () => {
  const newText = document.getElementById('newText').value.trim();
  if (newText && !initialText.includes(newText)) {
    const newItem = {text: newText, active: true};
    items.push(newItem);
    document.getElementById('newText').value = ''; // Clear input field
    updateItemsList();
    generateBoard();
  }
});

// Initial setup
generateBoard();
updateItemsList();