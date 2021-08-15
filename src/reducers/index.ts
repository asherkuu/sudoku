import reducer from './reducer'

export * from './actions'
export * from './interfaces'

export type IReducer = ReturnType<typeof reducer>
export default reducer

// interface 대신 ReturnType을 활용하여 중복을 제거한다.
// ReturnType 을 대체 하는 예제 소스는 아래와 같다.
/*
   interface AddTodoAction {
      /// 중복소스
      type: typeof ADD_TODO,
      payload: {
      title: string
      }
      /// 중복소스
   }

   >> action
   function addTodo(title: string): AddTodoAction {
      return {
         /// 중복소스
         type: ADD_TODO,
         payload: {
            title
         }
         /// 중복소스
      }
   }

   를 
   type AddTodoAction = ReturnType<typeof addTodo>
   로 변환.
   actions에 정해져 있는 return 데이터를 그대로 ReturnType<typeof ...> 로 
   사용하면 중복소스를 제거할 수 있다.
*/

