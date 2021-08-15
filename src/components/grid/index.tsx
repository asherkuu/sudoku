import React, { FC, Children, useEffect, useCallback } from 'react'
import useMousetrap from 'react-hook-mousetrap'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'

import { BLOCK_COORDS, GRID, INDEX, N, NUMBERS } from 'typings'
// createGrid, select 를 action.ts 에서 호출해와 action creator 생성 후
// dispatch 를 이용하여 함수 사용
import { createGrid, IReducer, select, fillBlock } from 'reducers'

import Block from './block'
import { Container, Row } from './styles'

interface IState {
   selectedBlock?: BLOCK_COORDS
   selectedValue: N
   solvedGrid?: GRID
}

const Grid: FC = () => {
   const state = useSelector<IReducer, IState>(({ selectedBlock, solvedGrid, workingGrid }) => ({ 
      selectedBlock,
      selectedValue: workingGrid && selectedBlock ? 
         workingGrid[selectedBlock[0]][selectedBlock[1]]
         : 0,
      solvedGrid
   }));
   // dispatch >> 액션을 스토어에 전달하는 것을 의미한다.
   const dispatch = useDispatch<Dispatch<AnyAction>>();
   // react useCallback >> 모든 함수는 컴포넌트가 리렌더링 될 때마다 새로 만들어진다.
   // 함수를 재 선언 하는 것은 메모리도, CPU도 리소스를 많이 차지하지는 않아 부하가 생길일은 없지만,
   // 한번 만든 함수를 필요할 때만 새로 만들고 재사용하기 위해서 사용된다.
   const create = useCallback(() => dispatch(createGrid()), [dispatch]);
         
   useEffect(() => {
      if(!state.solvedGrid)
      create();
   }, [create, state.solvedGrid]);

   const fill = useCallback(
      (n: NUMBERS) => {
         console.log(n)
         if(state.selectedBlock && state.selectedValue === 0) {
            dispatch(fillBlock(n, state.selectedBlock))
         }
      }
      ,[dispatch, state.selectedBlock, state.selectedValue]
   );

   function moveDown() {
      // 맨 밑칸의 박스는 아래로 이동 불가
      if(state.selectedBlock && state.selectedBlock[0] < 8)
      dispatch(select([state.selectedBlock[0] + 1 as INDEX, state.selectedBlock[1]]))
   }

   function moveLeft() {
      if(state.selectedBlock && state.selectedBlock[1] > 0)
      dispatch(select([state.selectedBlock[0], state.selectedBlock[1] - 1 as INDEX]))
   }

   function moveRight() {
      if(state.selectedBlock && state.selectedBlock[1] < 8)
      dispatch(select([state.selectedBlock[0], state.selectedBlock[1] + 1 as INDEX]))
   }

   function moveUp() {
      if(state.selectedBlock && state.selectedBlock[0] > 0)
      dispatch(select([state.selectedBlock[0] - 1 as INDEX, state.selectedBlock[1]]))
   }

   // 키보드 화살표 키 바인딩 이벤트
   useMousetrap('1', () => fill(1))
   useMousetrap('2', () => fill(2))
   useMousetrap('3', () => fill(3))
   useMousetrap('4', () => fill(4))
   useMousetrap('5', () => fill(5))
   useMousetrap('6', () => fill(6))
   useMousetrap('7', () => fill(7))
   useMousetrap('8', () => fill(8))
   useMousetrap('9', () => fill(9))
   
   useMousetrap('down', moveDown);
   useMousetrap('left', moveLeft);
   useMousetrap('right', moveRight);
   useMousetrap('up', moveUp);

   return (
      <Container data-cy="grid-container">
         {Children.toArray([...Array(9)].map((_, rowIndex) => (
            <Row data-cy="grid-row-container" key={rowIndex} >
               {Children.toArray([...Array(9)].map((_, colIndex) => (
                  <Block 
                     rowIndex={ rowIndex as INDEX } 
                     colIndex={ colIndex as INDEX }
                  />
               )))}
            </Row>
         )))}
      </Container>
   )
}

export default Grid
