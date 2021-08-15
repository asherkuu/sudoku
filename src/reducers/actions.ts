import { BLOCK_COORDS, NUMBERS } from './../typings';
import { Action, AnyAction } from 'redux'
import * as types from './types'

export const createGrid = (): Action => ({
   type: types.CRETAE_GRID 
})

export const select = (coords: BLOCK_COORDS) : AnyAction => ({ 
   type: types.SELECT_BLOCK,
   coords
})

export const fillBlock = (value: NUMBERS, coords : BLOCK_COORDS): AnyAction =>({
   type: types.FILL_BLOCK, 
   coords, 
   value
})