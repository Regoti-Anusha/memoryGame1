const categories = {
    fruits: [
      'images/apple.png', 'images/banana.jpg', 'images/grape.jpg', 'images/strawberry.jpg',
      'images/orange.jpg', 'images/watermelon.jpg', 'images/pineapple.jpg', 'images/mango.jpg'
    ],
    emojis: [
      'images/smile.jpg', 'images/laugh.png', 'images/sad.png', 'images/cool.png',
      'images/heart.jpg', 'images/party.jpg', 'images/cry.jpg', 'images/star.jpg'
    ],
    animals: [
      'images/dog.jpg', 'images/cat.jpg', 'images/rabbit.jpg', 'images/panda.jpg',
      'images/lion.png', 'images/tiger.png', 'images/koala.jpg', 'images/fox.jpg'
    ],
    planets: [
      'images/earth.jpg', 'images/moon.jpg', 'images/venus.jpg', 'images/mars.jpg',
      'images/jupiter.jpg', 'images/saturn.jpg', 'images/uranus.jpg', 'images/neptune.png'
    ],
    flags: [
      'images/usa.jpg', 'images/uk.jpg', 'images/canada.png', 'images/india.png',
      'images/brazil.png', 'images/japan.png', 'images/australia.png', 'images/spain.png'
    ]
  };
  
  let selectedCategory = '';
  let gameBoard = document.getElementById('game-board');
  let timerDisplay = document.getElementById('timer');
  let scoreDisplay = document.getElementById('score');
  let gameMessage = document.getElementById('game-message');
  let flippedCards = [];
  let matchedCards = 0;
  let timer;
  let score = 0;
  
  document.querySelectorAll('.category').forEach(button => {
    button.addEventListener('click', function() {
      selectedCategory = this.getAttribute('data-category');
      startGame(selectedCategory);
    });
  });
  
  function startGame(category) {
    document.querySelector('.landing-page').style.display = 'none';
    document.querySelector('.game-container').style.display = 'block';
    resetGame(category);
  }
  
  function resetGame(category) {
    gameBoard.innerHTML = '';
    flippedCards = [];
    matchedCards = 0;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    gameMessage.textContent = '';
    clearInterval(timer);
    startTimer();
    generateCards(category);
  }
  
  function generateCards(category) {
    let cards = [...categories[category], ...categories[category]];
    cards = shuffle(cards);
  
    cards.forEach(cardImage => {
      let card = document.createElement('div');
      card.classList.add('card');
      
      // Add image to the card
      let img = document.createElement('img');
      img.src = cardImage;
      card.appendChild(img);
  
      card.addEventListener('click', handleCardClick);
      gameBoard.appendChild(card);
    });
  }
  
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  function handleCardClick(event) {
    let clickedCard = event.target;
    if (flippedCards.length < 2 && !clickedCard.classList.contains('flipped')) {
      clickedCard.classList.add('flipped');
      flippedCards.push(clickedCard);
  
      if (flippedCards.length === 2) {
        checkForMatch();
      }
    }
  }
  
  function checkForMatch() {
    const [firstCard, secondCard] = flippedCards;
    const firstImg = firstCard.querySelector('img');
    const secondImg = secondCard.querySelector('img');
  
    if (firstImg.src === secondImg.src) {
      matchedCards++;
      score += 10;
      scoreDisplay.textContent = `Score: ${score}`;
      flippedCards = [];
      if (matchedCards === 8) {
        clearInterval(timer);
        gameMessage.textContent = 'You Win! 🎉';
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        flippedCards = [];
      }, 1000);
    }
  }
  
  function startTimer() {
    let timeRemaining = 50;
    timerDisplay.textContent = `Time: ${timeRemaining}`;
    timer = setInterval(() => {
      timeRemaining--;
      timerDisplay.textContent = `Time: ${timeRemaining}`;
      if (timeRemaining === 0) {
        clearInterval(timer);
        gameMessage.textContent = 'Game Over! ⏳';
      }
    }, 1000);
  }
  