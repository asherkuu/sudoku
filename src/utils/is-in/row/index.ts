import { GRID, NUMBERS } from './../../../typings/index';

interface IInput {
   grid: GRID
   row: number
   value: NUMBERS 
}

/**
 * A function that returns true if the value is already being used in the current grid row
 * @param param0 input Object with 9X9 Sudoku Grid, row index and value
 */
function isInRow({ grid, row, value }: IInput): boolean {
   return grid[row].includes(value);
}

export default isInRow