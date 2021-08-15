import { BLOCK_COORDS, GRID } from '../typings'

export interface IReducer {
   // grid?: GRID,
   challengeGrid?: GRID
   selectedBlock?: BLOCK_COORDS
   solvedGrid?: GRID
   workingGrid?: GRID
}
