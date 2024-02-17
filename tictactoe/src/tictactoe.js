import './tictactoe.css';
import React from 'react';
import {useState} from 'react';

function Box({val, onChangeSquare}) {
  return(
    <button onClick = {onChangeSquare} className='square'> {val} </button>
  );
}

function Message({xTurn, winner}) {
  if(winner != null) {
    return(
      <p> Winner: {winner}</p>
    );
  }
  else {
    if(xTurn) {
      return (<p> Turn: X</p>);
    }
    else {
      return (<p> Turn: O</p>);
    }
  }
}

function Board() {
  const [xTurn, setXTurn] = useState(true);
  const [boardState, setBoardState] = useState([]);
  const [winner, setWinner] = useState();

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

  function handleChangeSquare(index) {
    if(!winner && boardState.at(index) == null) {
        if(xTurn) {
          boardState[index] = 'X'; 
          setBoardState(boardState);
          setXTurn(false);
        }
        else {
          boardState[index] = 'O';
          setBoardState(boardState);
          setXTurn(true);
        }
        checkWin();
    }
  }

  return(
    <>
      <h1>TicTacToe</h1>
      <Message xTurn={xTurn} winner={winner}/>
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
