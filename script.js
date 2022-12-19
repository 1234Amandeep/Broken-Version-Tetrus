document.addEventListener('DOMContentLoaded', () => {
  let squares = Array.from(document.querySelectorAll('.grid div'));
  let scoreBoard = document.querySelector('.score');
  const startBtn = document.querySelector('.start-btn');
  const width = 10;

  let timerId;
  let randomNext = 0;
  let score = 0;

  const lTetromino = [
    [0, width, 1, 2],
    [0, 1, width+1, width*2+1],
    [width, width+1, 2, width+2],
    [0, width, width*2, width*2+1 ]
  ]

  const zTetromino = [
    [0, 1, width+1, width+2],
    [width, width*2, 1, width+1],
    [0, 1, width+1, width+2],
    [width, width*2, 1, width+1]
  ]

  const iTetromino = [
    [0, 1, 2, 3],
    [0, width, width*2, width*3],
    [0, 1, 2, 3],
    [0, width, width*2, width*3]
  ]
  
  const oTetromino = [
    [0, width, 1, width+1],
    [0, width, 1, width+1],
    [0, width, 1, width+1],
    [0, width, 1, width+1]
  ]

  const tTetromino = [
    [0, 1, width+1, 2],
    [width, 1, width+1, width*2+1],
    [width, 1, width+1, width+2],
    [0, width, width+1, width*2]
  ]

  const theTetrominos = [lTetromino, zTetromino, iTetromino, oTetromino, tTetromino];

  let currentPosition = 4;

  let randomTetromino = Math.floor(Math.random() * theTetrominos.length);

  let current = theTetrominos[randomTetromino][0];

  let randomRotation = 0;

  function draw() {
    current.forEach(index => {
      squares[index + currentPosition].classList.add('tetromino');
    })
  }  
  draw();


  function undraw() {
    current.forEach(index => {
      squares[index + currentPosition].classList.remove('tetromino');
    })
  }


  function control(e)
  {
    if(e.keyCode === 40)
    {
      moveDown();
    } else if(e.keyCode === 39)
    {
      moveRight();
    }
    else if(e.keyCode === 37)
    {
      moveLeft();
    } else if(e.keyCode === 38)
    {
      rotate();
    }
  }

  document.addEventListener('keyup', control);

  function moveDown() {
    undraw();

    currentPosition += width;

    draw();    
    freeze();
  }

  function freeze() {
    if(current.some(index => squares[index + currentPosition + width].classList.contains('taken')))
    {
      current.forEach(index => {
        squares[index + currentPosition].classList.add('taken')
      })
      randomTetromino = randomNext;

      randomNext = Math.floor(Math.random() * theTetrominos.length);
      current = theTetrominos[randomTetromino][0];
      currentPosition = 4;
      draw();
      futurePanel();
      addScore();
      gameOver();

    }
  }

  function moveLeft() {
    undraw();

    const isAtLeftEdge = current.some(index => ((index + currentPosition) % 10) === 0)

    if(!isAtLeftEdge)
    {
      currentPosition -= 1;
    }
    if(current.some(index => squares[index + currentPosition - 1].classList.contains('taken')))
    {
      currentPosition += 1;
    }

    draw();   
  }

  function moveRight() {
    undraw();

    const isAtRightEdge = current.some(index => (index + currentPosition) % 10 === 9);

    if(!isAtRightEdge)
    {
      currentPosition += 1;
    }
    if(current.some(index => squares[index + currentPosition].classList.contains('taken')))
    {
      currentPosition -= 1;
    }

    draw();
  }

  function rotate() {
    undraw();

    randomRotation++;

    if(randomRotation === current.length)
    {
      randomRotation = 0;
    }

    current = theTetrominos[randomTetromino][randomRotation];
    
    draw();
  }

  const displaySquares = Array.from(document.querySelectorAll('.mini-grid div'));
  const displayWidth = 4;
  let displayIndex = 0;

  const nextUpTetromino = [
    [0, displayWidth, 1, 2], //lTetromino
    [0, 1, displayWidth+1, displayWidth+2], //zTetromino
    [0, 1, 2, 3], //iTetromino
    [0, displayWidth, 1, displayWidth+1], //oTetromino
    [0, 1, displayWidth+1, 2]  //tTetromino
  ]

  function futurePanel() {
    let displayCurrent = nextUpTetromino[randomNext];
    displaySquares.forEach(index => {
      index.classList.remove('tetromino')
    })

    displayCurrent.forEach(index => {
      displaySquares[index + displayIndex].classList.add('tetromino');
    })
  }

  StartBtn.addEventListener('click', () =>{
    if(timerId)
    {
      clearInterval(timerId);
      timerId = null;
    }
    else {
      draw();
      timerId = setInterval(moveDown, 1000);
      randomNext = Math.floor(Math.random()*theTetrominos.length);
      futurePanel();
    }
  })

  function addScore()
  {
    for(let i = 0; i < 199; i +=width)
    {
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9];

      if(row.every(index => squares[index].classList.contains('taken')))
      {
        score += 10;
        scoreBoard.innerHTML = score;

        row.forEach(index => {
          squares[index].classList.remove('taken')
          squares[index].classList.remove('tetromino')
        })
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach(cell => grid.appendChild(cell))
        
      }
    }
  }

  function gameOver()
  {
    if(current.some(index => squares[index + currentPosition].classList.contains('taken')))
    {
      scoreBoard.innerHTML = 'end';
      clearInterval(timerId);
    }
  }



   

  






































})
