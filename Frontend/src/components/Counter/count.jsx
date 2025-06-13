import React from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { increment,decrement } from '../../sclices/countSlice'
const Count = () => {
const {count} = useSelector((state)=>state.count) 
const dispatch = useDispatch()
 return (
<>
<button onClick={()=>dispatch(increment())}>increment</button>
<div>count:{count}</div>
<button onClick={()=>dispatch(decrement())}>decrement</button>
</>
  )
}

export default Count