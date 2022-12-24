import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { decerement, increment } from './../../app/Store/Slice/CounterSlice';

const CounterPage = () => {
  const dispatch = useDispatch();
  const { value } = useSelector((state) => state.counter);
  return (
    <div>
      <h2>CounterPage</h2>
      <div style={{ display: 'flex', width: '150px' }}>
        <button
          onClick={() => {
            dispatch(increment());
          }}
        >
          +
        </button>
        <div style={{ marginRight: '1rem', marginLeft: '1rem' }}>{value}</div>
        <button
          onClick={() => {
            dispatch(decerement());
          }}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default CounterPage;
