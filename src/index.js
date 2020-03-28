module.exports = function solveSudoku(matrix) {

  let solution = [];
  let values = [];
  for (let i = 0; i < matrix.length; i++)
    solution[i] = [...matrix[i]];

  round(solution);

  function round(solution){
    let minPossibleValueCountCell = [];
    while (true){
      minPossibleValueCountCell = [];
      for (let i = 0; i < solution.length; i++)
        for (let j = 0; j < solution[i].length; j++){
          if (solution[i][j] != 0)
            continue;
          let possibleValues = findPossibleValues(i, j, solution);
          let possibleValueCount = possibleValues.length;
          if (possibleValueCount == 0)
            return false;
          if (possibleValueCount == 1)
            solution[i][j] = possibleValues.pop();
          if (minPossibleValueCountCell.length == 0 || possibleValueCount < minPossibleValueCountCell[1].length){
            minPossibleValueCountCell[0] = [i, j];
            minPossibleValueCountCell[1] = possibleValues;
          }
        }
      if (minPossibleValueCountCell.length == 0)
        return true;
      else if (minPossibleValueCountCell[1].length > 1)
        break;
    }
    let r = minPossibleValueCountCell[0][0];
    let c = minPossibleValueCountCell[0][1];
    for (let n = 0; n < minPossibleValueCountCell[1].length; n++){
      let solutionCopy = [];
      for (let k = 0; k < solution.length; k++)
        solutionCopy[k] = [...solution[k]];
      solutionCopy[r][c] = minPossibleValueCountCell[1][n];
      if (round(solutionCopy)){
        for (let i = 0; i < 9; i ++)
          for (let j = 0; j < 9; j++)
          solution[ i ][ j ] = solutionCopy[ i ][ j ];
        return true;
      }

    }
    return false;
  }

  function findPossibleValues(rowIndex, columnIndex, puzzle){
    values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    checkVertical(columnIndex, puzzle);
    checkHorizontal(rowIndex, puzzle);
    checkBlock(rowIndex, columnIndex, puzzle);
    return values;
  }

  function checkVertical(x, puzzle){
    for (let i = 0; i < 9; i++)
      if (values.indexOf(puzzle[i][x]) != -1)
        values.splice( values.indexOf(puzzle[i][x]), 1 );
  }

  function checkHorizontal(x, puzzle){
    for (let j = 0; j < 9; j++)
    if (values.indexOf(puzzle[x][j]) != -1)
      values.splice( values.indexOf(puzzle[x][j]), 1 );
  }

  function checkBlock(x, y, puzzle){
    let a1, a2, b1, b2;

    if (x < 3){
      a1 = 0;
      a2 = 3;
    }
    else if (x < 6){
      a1 = 3;
      a2 = 6;
    }
    else {
      a1 = 6;
      a2 = 9;
    }

    if (y < 3){
      b1 = 0;
      b2 = 3;
    }
    else if (y < 6){
      b1 = 3;
      b2 = 6;
    }
    else {
      b1 = 6;
      b2 = 9;
    }

    for (let i = a1; i < a2; i++)
      for (let j = b1; j < b2; j++){
        if (values.indexOf(puzzle[i][j]) != -1)
          values.splice( values.indexOf(puzzle[i][j]), 1 );
      }
  }



  return solution;

}