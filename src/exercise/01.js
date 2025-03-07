// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import React from 'react';

const countReducer = (currentState, action) => {
  if (action.type === 'INCREMENT') {
    return {count: currentState.count + action.step};
  }
  throw new Error('unsupported action type');
};

function Counter({initialCount = 0, step = 1}) {
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  });
  const {count} = state;
  const increment = () => dispatch({type: 'INCREMENT', step});
  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter />;
}

export default App;
