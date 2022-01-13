import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { IRootReducerState } from '../../store';
import {
  IAction as DefaultReducerAction,
  ReducerType as DefaultReducerType,
} from '../../store/defaultReducer';

function Home() {
  const dispatch = useDispatch<Dispatch<DefaultReducerAction>>();
  const count = useSelector<IRootReducerState>(({ defaultReducer }) => defaultReducer.count);

  const addCount = (count: number) =>
    dispatch({ type: DefaultReducerType.ADD_COUNT, payload: { count } });
  const reduceCount = (count: number) =>
    dispatch({ type: DefaultReducerType.REDUCE_COUNT, payload: { count } });

  return (
    <>
      <div>Home page</div>
      <p>Count: {count}</p>
      <div>
        <button onClick={() => addCount(Number(prompt()))}>Add count</button>
        <button onClick={() => reduceCount(Number(prompt()))}>Reduce count</button>
      </div>
    </>
  );
}

export default Home;
