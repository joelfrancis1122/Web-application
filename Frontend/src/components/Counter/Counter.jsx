import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../sclices/CounterSlice';  // Import actions


const Counter = () => {
    const count = useSelector((state) => state.counter.count); // Access count from Redux state
    const dispatch = useDispatch(); // To dispatch actions
  
    return (
      <div>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <h1>Counter: {count}</h1>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    );
  };
  
  export default Counter;