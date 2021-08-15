import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Dispatch, AnyAction } from 'redux'

import { IReducer, select } from 'reducers'
import { INDEX, N } from 'typings'
import { Container } from './styles'

interface IProps {
   colIndex: INDEX
   rowIndex: INDEX
}

interface IState {
   value: N
   isPuzzle: boolean
   isActive: boolean
}

const Block: FC<IProps> = ({ colIndex, rowIndex }) => {
   /* 
      const result : any = useSelector(selector: Function, deps: any[]);
      selector >> 기존에 사용했던 redux와 연결하기 위한 connect로 사용할 때 mapStateToProps와 비슷하다고 생각하면 된다.
      deps >> 어떤 값이 바뀌었을 때 selector를 재정의 할 지 설정해 준다. deps를 생략하게 되면 매번 렌더링 될 때마다 selector 함수도 새로 정의된다.
      selector 함수를 선언하는게 큰 리소스는 들어가진 않기 때문에 기본적으로 deps를 넣지 않아도 큰 문제는 없지만
      그래도 최적화에 신경이 쓰인다면 deps 파라미터에 [] 를 기본적으로 쓰는 것도 나쁘지 않다.
      그리고 실제 deps 배열에 넣어야 되는 값이 보인다면 더욱 좋다.
      ex ) const counter = useSelector(state => state.counter, []);
      ex ) const { a, b } = useSelector(state => ({ a: state.a, state.b }), [])
   */
   const state = useSelector<IReducer, IState>(({ challengeGrid, workingGrid, selectedBlock }) => ({ 
      isActive: selectedBlock 
         ? selectedBlock[0] === rowIndex && selectedBlock[1] === colIndex 
         : false,
      isPuzzle: challengeGrid && challengeGrid[rowIndex][colIndex] !== 0 
         ? true 
         : false,
      value : workingGrid ? workingGrid[rowIndex][colIndex] : 0 
   }))

   const dispatch = useDispatch<Dispatch<AnyAction>>()

   function handleClick() {
      if(!state.isActive) {
         dispatch(select([rowIndex, colIndex]));
      }
   }

   return (
      <Container 
         data-cy={`block-${rowIndex}-${colIndex}`} 
         onClick={handleClick} 
         active={state.isActive}
         puzzle={state.isPuzzle}
      >
         {state.value === 0 ? '' : state.value}
      </Container>
   )
}

export default Block
