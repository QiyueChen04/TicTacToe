import './tictactoe.css';
import React from 'react';
import {useState} from 'react';

// Box component to represent squares in the TicTacToe board
function Box({val, onChangeSquare}) {
  return(
    <button onClick = {onChangeSquare} className='square'> {val} </button>
  );
}

// Message component to display the current state of the game(win, draw, X's turn or O's turn)
function Message({xTurn, winner, emptyBoxes}) {
  if(winner != null) {
    return(
      <p> Winner: {winner}</p>
    );
  }
  if(emptyBoxes == 0) {
    return (
      <p> Draw </p>
    );
  }
  if(xTurn) {
    return (<p> Turn: X</p>);
  }
  else {
    return (<p> Turn: O</p>);
  }
}

// Board components
function Board() {
  const [xTurn, setXTurn] = useState(true);
  const [boardState, setBoardState] = useState([]); 
  const [winner, setWinner] = useState();
  const [emptyBoxes, setEmptyBoxes] = useState(9); // The empty boxes to track when the game is a draw

  // Checks if there's a winner, if so, return the winner and the message component will be updated immediately
  function checkWin() {
    const wins = [
      [0, 1, 2],
      [3, 4, 5], 
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ];

    for(let i = 0; i < wins.length; i++) {
      const index1 = wins[i][0];
      const index2 = wins[i][1];
      const index3 = wins[i][2];

      if(boardState[index1] && (boardState[index1] === boardState[index2]) && (boardState[index2] === boardState[index3])) {
        setWinner(boardState[index1]);
      }
    }
  }

  // When a box (child of the Board component) is clicked, if the game isn't over and box is empty
  // then update the board accordingly
  function handleChangeSquare(index) {
    if(!winner && boardState.at(index) == null) {
        if(xTurn) {
          boardState[index] = 'X'; 
          setXTurn(false);
        }
        else {
          boardState[index] = 'O';
          setXTurn(true);
        }
        setBoardState(boardState);
        setEmptyBoxes(emptyBoxes - 1);
        checkWin();
    }
  }

  return(
    <>
      <h1>TicTacToe</h1>
      <Message xTurn={xTurn} winner={winner} emptyBoxes={emptyBoxes}/>
      <table align="center">
        <tr>
          <Box val = {boardState[0]} onChangeSquare={() => handleChangeSquare(0)}/>
          <Box val = {boardState[1]} onChangeSquare={() => handleChangeSquare(1)}/>
          <Box val = {boardState[2]} onChangeSquare={() => handleChangeSquare(2)}/>
        </tr>
        <tr>
          <Box val = {boardState[3]} onChangeSquare={() => handleChangeSquare(3)}/>
          <Box val = {boardState[4]} onChangeSquare={() => handleChangeSquare(4)}/>
          <Box val = {boardState[5]} onChangeSquare={() => handleChangeSquare(5)}/>
        </tr>
        <tr>
          <Box val = {boardState[6]} onChangeSquare={() => handleChangeSquare(6)}/>
          <Box val = {boardState[7]} onChangeSquare={() => handleChangeSquare(7)}/>
          <Box val = {boardState[8]} onChangeSquare={() => handleChangeSquare(8)}/>        
        </tr>
      </table>
    </>
  );
}

function TicTacToe() {
  return(
    <Board />
  );
}

export default TicTacToe;
