import './App.css';
import { useEffect, useState } from 'react';

function App() {

  //-1 - the square contains bomb
  //0 - the square is empty
  //1 - the square touches one bomb
  //2 - the square touches two bomb
  //3 ..
  const emptyGrid = [
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0]
  ];

  let grid = emptyGrid;
  const [gridState,setGridState] = useState(emptyGrid);
  const [restart,setRestart] = useState(false);
  const [timer,setTimer] = useState(0);
  const [bombCounter,setBombCounter] = useState(10);
  const [boardSize,setBoardSize] = useState(9);
  const [lostGame, setLostGame] = useState(false)
  const [visible,setVisble] = useState(false)
  //checks how many bombs are around this square
  const bombCheck = (y,x,y1,x1) =>{
    try{
      if(grid[y1][x1] === -1 && grid[y][x] !==-1){
        return grid[y][x] +=1
      }
    }
    catch{
      return 0
    }
  }

  //creates new game
  //FIX - it onlt shows 8 bombs instead of 9 
  const newGame = () =>{

    grid = emptyGrid;

    for(let i = 0; i < bombCounter; i++){
      grid[Math.floor(Math.random() * (boardSize - 1))][Math.floor(Math.random() * (boardSize - 1))] = -1;
    }

    //for loop with variable y is going verticaly
    for(let y = 0 ; y < boardSize; y++){
      //the one with x is going horizontally
        for(let x = 0; x < boardSize; x++){
          bombCheck(y,x,y+1,x);
          bombCheck(y,x,y-1,x);
          bombCheck(y,x,y,x+1);
          bombCheck(y,x,y,x-1);
          bombCheck(y,x,y+1,x-1);
          bombCheck(y,x,y+1,x+1);
          bombCheck(y,x,y-1,x-1);
          bombCheck(y,x,y-1,x+1);
        }
    }
    console.log(grid)
    setGridState(grid)
  }

  const handleLeftClick = (e) => {
    if(e.target.value == -1){
      setLostGame(true)
    }
    else if(e.target.value > 0){

    }else if(e.target.value == 0){

    }
  }
  // displays gird array as html element
  const displayGrid = () => {
    return gridState.map((row,rowIdx)=>{
      return(<div key={rowIdx} className={`row ${rowIdx}`}>
        {
          row.map((square,squareIdx)=>{
            return(
            <div 
              key={squareIdx} 
              className={`square ${squareIdx}`} 
              value={square}
              onClick={handleLeftClick}
            >
                {square}
            </div>
            )
          })
        }
      </div>
      )
    })
  }
  useEffect(() => {
    newGame();
    const intervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000)
  },[])

  //timer

  return (
    <div className="App">
      <div className = "game-board">

        <div className = "menu">
            <div className = "bomb-counter">
              {bombCounter}
            </div>
            <button className = "reset-button" onClick={()=>{setTimer(0); newGame()}}>
              ;)
            </button>
            <div className = "timer">
              {timer}
            </div>
        </div>
          
        <div className='grid'>
          {
            displayGrid()
          }
        </div>
      </div>
    </div>
  );
}

export default App;
